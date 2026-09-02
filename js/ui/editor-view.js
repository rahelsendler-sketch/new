/**
 * ASAH C++ — Interactive Code Editor View & Test Case Verification Panel
 * Line numbers, real-time C++ execution console, input stream prompt, and multi-tier hints.
 */

class EditorView {
    constructor() {
        this.currentChallenge = null;
        this.hintIndex = 0;
        this.onPassedCallback = null;
    }

    mount(containerEl, challengeData, onPassedCallback) {
        if (!containerEl) return;

        this.currentChallenge = challengeData;
        this.hintIndex = 0;
        this.onPassedCallback = onPassedCallback;

        const starterCode = challengeData ? challengeData.starterCode : `#include <iostream>\nusing namespace std;\n\nint main() {\n    cout << "Hello World!";\n    return 0;\n}`;

        containerEl.innerHTML = `
            <div class="code-editor-card">
                <div class="editor-toolbar">
                    <div class="editor-title">
                        <span>⚡</span> C++ EDITOR CONSOLE
                    </div>
                    <div class="editor-actions-group">
                        <button class="btn-editor-action btn-reset-code" id="btn-editor-reset" title="Kembalikan kode ke posisi awal">
                            <span>🔄</span> Reset
                        </button>
                        ${challengeData && challengeData.hints ? `
                            <button class="btn-editor-action btn-hint-code" id="btn-editor-hint" title="Minta petunjuk/hint bertingkat">
                                <span>💡</span> Hint (${challengeData.hints.length})
                            </button>
                        ` : ''}
                        <button class="btn-editor-action btn-run-code" id="btn-editor-run">
                            <span>▶</span> RUN CODE
                        </button>
                    </div>
                </div>

                <!-- Editor Grid with Line Numbers -->
                <div class="editor-body-grid">
                    <div class="line-numbers-col" id="editor-line-numbers">1<br>2<br>3<br>4<br>5<br>6<br>7<br>8</div>
                    <textarea class="code-textarea" id="editor-code-input" spellcheck="false" autocomplete="off">${starterCode}</textarea>
                </div>

                <!-- Input Stream Field (shown if test case or cin is required) -->
                <div class="input-stream-bar" id="input-stream-bar" style="display: none;">
                    <span class="input-stream-label">⌨️ Input Stream (cin):</span>
                    <input type="text" class="input-stream-field" id="input-stream-val" placeholder="Masukkan nilai input untuk cin (misal: Budi)...">
                </div>

                <!-- Console Output Panel -->
                <div class="console-output-panel">
                    <div class="console-header-bar">
                        <span>OUTPUT CONSOLE & VERIFIER</span>
                        <span class="console-status-tag" id="console-status-tag">Ready</span>
                    </div>
                    <div class="console-log-body" id="console-log-body">
> Tekan [▶ RUN CODE] untuk mengompilasi dan menguji kode C++ kamu.
                    </div>
                </div>
            </div>
        `;

        const textarea = containerEl.querySelector('#editor-code-input');
        const lineNumbers = containerEl.querySelector('#editor-line-numbers');
        const runBtn = containerEl.querySelector('#btn-editor-run');
        const resetBtn = containerEl.querySelector('#btn-editor-reset');
        const hintBtn = containerEl.querySelector('#btn-editor-hint');
        const consoleLog = containerEl.querySelector('#console-log-body');
        const statusTag = containerEl.querySelector('#console-status-tag');
        const inputBar = containerEl.querySelector('#input-stream-bar');
        const inputVal = containerEl.querySelector('#input-stream-val');

        // Show Input Stream Bar if test case requires input
        if (challengeData && challengeData.testCases && challengeData.testCases.some(tc => tc.input)) {
            inputBar.style.display = 'flex';
            const firstInput = challengeData.testCases.find(tc => tc.input)?.input || '';
            inputVal.value = firstInput;
        }

        // Sync Line Numbers
        const updateLineNumbers = () => {
            const linesCount = textarea.value.split('\n').length;
            lineNumbers.innerHTML = Array.from({ length: Math.max(linesCount, 8) }).map((_, i) => i + 1).join('<br>');
        };

        textarea.addEventListener('input', updateLineNumbers);
        textarea.addEventListener('keydown', (e) => {
            // Handle Tab Key in Editor
            if (e.key === 'Tab') {
                e.preventDefault();
                const start = textarea.selectionStart;
                const end = textarea.selectionEnd;
                textarea.value = textarea.value.substring(0, start) + '    ' + textarea.value.substring(end);
                textarea.selectionStart = textarea.selectionEnd = start + 4;
                updateLineNumbers();
            }
        });

        updateLineNumbers();

        // Run Code Execution
        runBtn.addEventListener('click', () => {
            const userCode = textarea.value;
            const inputData = inputVal ? inputVal.value : '';

            statusTag.textContent = 'Executing...';
            statusTag.className = 'console-status-tag';

            const result = cppExecutor.execute(userCode, inputData);

            if (!result.success) {
                statusTag.textContent = 'Syntax / Error';
                statusTag.className = 'console-status-tag error';
                consoleLog.className = 'console-log-body has-error';
                consoleLog.textContent = `❌ ${result.error}`;
                return;
            }

            statusTag.textContent = 'Success';
            statusTag.className = 'console-status-tag success';
            consoleLog.className = 'console-log-body';

            let outputText = `> Output Program:\n${result.output || '(Tidak ada output)'}\n`;

            // Verify Challenge Test Cases if challengeData exists
            if (challengeData && challengeData.testCases) {
                let allPassed = true;
                let testReport = '\n--- Hasil Pengujian Test Case ---\n';

                challengeData.testCases.forEach((tc, idx) => {
                    // Re-run execution with test case input if specified
                    const tcInput = tc.input !== undefined ? tc.input : inputData;
                    const tcResult = cppExecutor.execute(userCode, tcInput);
                    const actualOut = tcResult.output.trim();
                    const expectedOut = tc.expectedOutput.trim();

                    const passed = (actualOut === expectedOut);
                    if (!passed) allPassed = false;

                    testReport += `[Test ${idx + 1}] ${tc.description}\n`;
                    testReport += `  • Expected: "${expectedOut}"\n`;
                    testReport += `  • Actual:   "${actualOut}"\n`;
                    testReport += `  • Status:   ${passed ? '✅ PASSED' : '❌ FAILED'}\n\n`;
                });

                outputText += testReport;

                if (allPassed) {
                    outputText += `🎉 SELAMAT! Semua test case berhasil dilewati!\n`;
                    if (typeof this.onPassedCallback === 'function') {
                        this.onPassedCallback(true);
                    }
                } else {
                    outputText += `💡 Petunjuk: Output belum sesuai dengan yang diharapkan. Periksa kembali format teks atau logikanya.`;
                }
            }

            consoleLog.textContent = outputText;
        });

        // Reset Code
        if (resetBtn) {
            resetBtn.addEventListener('click', () => {
                textarea.value = starterCode;
                updateLineNumbers();
                consoleLog.textContent = '> Kode telah dikembalikan ke posisi awal.';
                statusTag.textContent = 'Reset';
            });
        }

        // Multi-tier Hints Drawer
        if (hintBtn && challengeData && challengeData.hints) {
            hintBtn.addEventListener('click', () => {
                const hints = challengeData.hints;
                const currentHint = hints[this.hintIndex % hints.length];
                this.hintIndex++;

                consoleLog.className = 'console-log-body';
                consoleLog.textContent = `💡 HINT (${this.hintIndex}/${hints.length}):\n${currentHint}`;
            });
        }
    }
}

window.editorView = new EditorView();
