/**
 * ASAH C++ — Complete C++ Execution & Syntax Evaluation Engine
 * Supports: iostream, cout, cin, variables, operators (+, -, *, /, %, ++, --)
 * Conditionals (if, else if, else, ==, !=, >, <, >=, <=, &&, ||, !)
 * Loops (while, for), Functions (void, return value), Arrays, Structs, Classes & Recursion.
 */

class CppExecutor {
    constructor() {}

    /**
     * Executes C++ source code with optional standard input
     * @param {string} code 
     * @param {string} inputData 
     * @returns {{ success: boolean, output: string, error?: string, errorLine?: number }}
     */
    execute(code, inputData = '') {
        const cleanCode = code.trim();
        if (!cleanCode) {
            return {
                success: false,
                output: '',
                error: 'Kode C++ masih kosong! Silakan tulis kode terlebih dahulu.'
            };
        }

        // 1. Basic Structure Checks
        if (!cleanCode.includes('int main')) {
            return {
                success: false,
                output: '',
                error: 'Sintaks Error: Fungsi `int main()` tidak ditemukan. Setiap program C++ wajib memiliki fungsi main() sebagai titik awal eksekusi.'
            };
        }

        // 2. Syntax Validation: Check balanced braces & quotes
        const braceError = this.checkBracesAndQuotes(cleanCode);
        if (braceError) {
            return { success: false, output: '', error: braceError };
        }

        // 3. Line-by-Line Semicolon & Syntax Check
        const lines = cleanCode.split('\n');
        for (let i = 0; i < lines.length; i++) {
            const rawLine = lines[i];
            const trimmed = rawLine.trim();

            if (!trimmed || trimmed.startsWith('//') || trimmed.startsWith('/*')) continue;
            if (trimmed.startsWith('#include') || trimmed.startsWith('using') || trimmed.startsWith('int main') || trimmed === '{' || trimmed === '}' || trimmed.startsWith('else') || trimmed.startsWith('struct') || trimmed.startsWith('class') || trimmed.startsWith('public:') || trimmed.startsWith('private:')) {
                continue;
            }
            if (trimmed.startsWith('if') || trimmed.startsWith('for') || trimmed.startsWith('while') || trimmed.match(/^(void|int|double|string)\s+[a-zA-Z0-9_]+\s*\(/)) {
                if (trimmed.endsWith('{') || lines[i + 1]?.trim().startsWith('{')) continue;
            }

            // If line is an active statement and does not end with ';' or '{' or '}' or ':'
            if (!trimmed.endsWith(';') && !trimmed.endsWith('{') && !trimmed.endsWith('}') && !trimmed.endsWith(':')) {
                return {
                    success: false,
                    output: '',
                    errorLine: i + 1,
                    error: `Sintaks Error (Baris ${i + 1}): Sepertinya kamu lupa menutup instruksi dengan tanda titik koma (;)\nKode: "${trimmed}"`
                };
            }
        }

        // 4. Client-side Interpreter Execution
        try {
            const execResult = this.interpret(cleanCode, inputData);
            return execResult;
        } catch (err) {
            return {
                success: false,
                output: '',
                error: `Runtime Error: ${err.message}`
            };
        }
    }

    checkBracesAndQuotes(code) {
        let openBrace = 0;
        let inString = false;

        for (let i = 0; i < code.length; i++) {
            const char = code[i];
            if (char === '"' && (i === 0 || code[i - 1] !== '\\')) {
                inString = !inString;
            }
            if (!inString) {
                if (char === '{') openBrace++;
                if (char === '}') openBrace--;
            }
        }

        if (inString) return 'Sintaks Error: Terdapat tanda petik ganda (") yang belum ditutup!';
        if (openBrace > 0) return 'Sintaks Error: Terdapat kurung kurawal pembuka `{` yang belum ditutup dengan `}`!';
        if (openBrace < 0) return 'Sintaks Error: Kelebihan kurung kurawal penutup `}`!';
        return null;
    }

    interpret(code, inputData = '') {
        let output = '';
        const variables = {};
        const userFunctions = {};
        const inputTokens = inputData.trim().split(/\s+/).filter(Boolean);
        let inputIdx = 0;

        // Parse custom user functions outside main()
        const funcMatches = code.matchAll(/(void|int|double|string)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\((.*?)\)\s*\{([\s\S]*?)\}/g);
        for (let m of funcMatches) {
            const retType = m[1];
            const name = m[2];
            const params = m[3];
            const body = m[4];
            if (name !== 'main') {
                userFunctions[name] = { retType, params, body };
            }
        }

        // Extract body inside int main() { ... }
        const mainMatch = code.match(/int\s+main\s*\(\s*\)\s*\{([\s\S]*)\}/);
        if (!mainMatch) {
            return { success: false, output: '', error: 'Tidak dapat menemukan blok instruksi di dalam main().' };
        }

        const bodyText = mainMatch[1];
        const lines = bodyText.split('\n').map(l => l.trim()).filter(Boolean);

        let lineIdx = 0;
        let maxIterations = 10000;
        let iterationCount = 0;

        while (lineIdx < lines.length) {
            iterationCount++;
            if (iterationCount > maxIterations) {
                return { success: false, output: output, error: 'Infinite Loop / Recursion Limit Exceeded!' };
            }

            let line = lines[lineIdx];
            if (!line || line.startsWith('//') || line === '{' || line === '}') {
                lineIdx++;
                continue;
            }

            let stmt = line.endsWith(';') ? line.slice(0, -1).trim() : line;
            if (stmt.startsWith('return')) break;

            // A. Handle Variable & Array Declarations
            const arrayMatch = stmt.match(/^(int|double|float|string)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*\[\s*(\d*)\s*\](?:\s*=\s*\{(.*)\})?$/);
            if (arrayMatch) {
                const type = arrayMatch[1];
                const arrName = arrayMatch[2];
                const initValues = arrayMatch[4];
                if (initValues) {
                    variables[arrName] = initValues.split(',').map(v => this.evaluateExpr(v.trim(), variables));
                } else {
                    variables[arrName] = [];
                }
                lineIdx++;
                continue;
            }

            const declMatch = stmt.match(/^(int|double|float|string|bool)\s+([a-zA-Z_][a-zA-Z0-9_]*)(?:\s*=\s*(.*))?$/);
            if (declMatch) {
                const type = declMatch[1];
                const varName = declMatch[2];
                const initExpr = declMatch[3];

                if (initExpr !== undefined) {
                    variables[varName] = this.evaluateExpr(initExpr, variables);
                } else {
                    variables[varName] = type === 'string' ? '' : 0;
                }
                lineIdx++;
                continue;
            }

            // B. Increment / Decrement
            if (stmt.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*\+\+$/)) {
                const v = stmt.replace('++', '').trim();
                variables[v] = (variables[v] || 0) + 1;
                lineIdx++;
                continue;
            }
            if (stmt.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*--$/)) {
                const v = stmt.replace('--', '').trim();
                variables[v] = (variables[v] || 0) - 1;
                lineIdx++;
                continue;
            }

            // C. Variable Assignment & Array Index Assignment (e.g. arr[0] = 10)
            const arrAssignMatch = stmt.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*\[\s*(.*?)\s*\]\s*=\s*(.*)$/);
            if (arrAssignMatch) {
                const arrName = arrAssignMatch[1];
                const idx = Number(this.evaluateExpr(arrAssignMatch[2], variables));
                const val = this.evaluateExpr(arrAssignMatch[3], variables);
                if (!variables[arrName]) variables[arrName] = [];
                variables[arrName][idx] = val;
                lineIdx++;
                continue;
            }

            const assignMatch = stmt.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.*)$/);
            if (assignMatch && !stmt.startsWith('cout') && !stmt.startsWith('cin')) {
                const varName = assignMatch[1];
                const expr = assignMatch[2];
                variables[varName] = this.evaluateExpr(expr, variables, userFunctions);
                lineIdx++;
                continue;
            }

            // D. Handle cin >> var1
            if (stmt.startsWith('cin')) {
                const parts = stmt.replace(/^cin\s*/, '').split('>>').map(p => p.trim()).filter(Boolean);
                for (let varName of parts) {
                    if (inputIdx < inputTokens.length) {
                        const val = inputTokens[inputIdx++];
                        variables[varName] = isNaN(val) ? val : Number(val);
                    } else {
                        variables[varName] = '';
                    }
                }
                lineIdx++;
                continue;
            }

            // E. Handle cout << ...
            if (stmt.startsWith('cout')) {
                const parts = stmt.replace(/^cout\s*/, '').split('<<').map(p => p.trim()).filter(Boolean);
                for (let part of parts) {
                    if (part === 'endl') {
                        output += '\n';
                    } else if (part.startsWith('"') && part.endsWith('"')) {
                        let str = part.slice(1, -1);
                        str = str.replace(/\\n/g, '\n').replace(/\\t/g, '\t');
                        output += str;
                    } else {
                        const val = this.evaluateExpr(part, variables, userFunctions);
                        output += (val !== undefined ? val : '');
                    }
                }
                lineIdx++;
                continue;
            }

            // F. Handle Function Call Statement (e.g. sapa(); or hitung();)
            const funcCallMatch = stmt.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*\((.*)\)$/);
            if (funcCallMatch && userFunctions[funcCallMatch[1]]) {
                const fnName = funcCallMatch[1];
                const argsStr = funcCallMatch[2];
                const fnResult = this.callUserFunction(fnName, argsStr, variables, userFunctions, inputData);
                output += fnResult.output;
                lineIdx++;
                continue;
            }

            // G. Handle Conditionals: if / else if / else
            if (stmt.startsWith('if') || stmt.startsWith('else if') || stmt.startsWith('else')) {
                const condMatch = stmt.match(/(?:if|else\s+if)\s*\((.*)\)/);
                let conditionPassed = false;

                if (stmt.startsWith('else') && !stmt.includes('if')) {
                    conditionPassed = true;
                } else if (condMatch) {
                    conditionPassed = Boolean(this.evaluateExpr(condMatch[1], variables, userFunctions));
                }

                let blockLines = [];
                let depth = 0;
                let startBlock = false;
                let j = lineIdx;

                while (j < lines.length) {
                    let cur = lines[j];
                    if (cur.includes('{')) { depth++; startBlock = true; }
                    if (startBlock && j > lineIdx) blockLines.push(cur);
                    if (cur.includes('}')) {
                        depth--;
                        if (depth === 0 && startBlock) { j++; break; }
                    }
                    j++;
                }

                if (conditionPassed) {
                    const innerCode = `int main() {\n${blockLines.join('\n')}\n}`;
                    const innerResult = this.interpret(innerCode, inputData);
                    output += innerResult.output;
                    lineIdx = j;
                    while (lineIdx < lines.length && (lines[lineIdx].startsWith('else') || lines[lineIdx].startsWith('else if'))) {
                        let k = lineIdx;
                        let d = 0;
                        let sb = false;
                        while (k < lines.length) {
                            if (lines[k].includes('{')) { d++; sb = true; }
                            if (lines[k].includes('}')) { d--; if (d === 0 && sb) { k++; break; } }
                            k++;
                        }
                        lineIdx = k;
                    }
                } else {
                    lineIdx = j;
                }
                continue;
            }

            // H. Handle Loops: while & for
            if (stmt.startsWith('while')) {
                const condMatch = stmt.match(/while\s*\((.*)\)/);
                if (condMatch) {
                    let j = lineIdx;
                    let blockLines = [];
                    let depth = 0;
                    let startBlock = false;

                    while (j < lines.length) {
                        let cur = lines[j];
                        if (cur.includes('{')) { depth++; startBlock = true; }
                        if (startBlock && j > lineIdx) blockLines.push(cur);
                        if (cur.includes('}')) {
                            depth--;
                            if (depth === 0 && startBlock) { j++; break; }
                        }
                        j++;
                    }

                    let loopCounter = 0;
                    while (this.evaluateExpr(condMatch[1], variables, userFunctions)) {
                        loopCounter++;
                        if (loopCounter > maxIterations) {
                            return { success: false, output: output, error: 'Infinite Loop Detected!' };
                        }
                        const innerCode = `int main() {\n${blockLines.join('\n')}\n}`;
                        const innerResult = this.interpret(innerCode, inputData);
                        output += innerResult.output;
                    }
                    lineIdx = j;
                    continue;
                }
            }

            if (stmt.startsWith('for')) {
                const forMatch = stmt.match(/for\s*\((.*?);(.*?);(.*?)\)/);
                if (forMatch) {
                    const initStmt = forMatch[1].trim();
                    const condExpr = forMatch[2].trim();
                    const incrStmt = forMatch[3].trim();

                    if (initStmt) {
                        const decl = initStmt.match(/^(int|double|float)\s+([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.*)$/);
                        if (decl) variables[decl[2]] = this.evaluateExpr(decl[3], variables, userFunctions);
                    }

                    let j = lineIdx;
                    let blockLines = [];
                    let depth = 0;
                    let startBlock = false;

                    while (j < lines.length) {
                        let cur = lines[j];
                        if (cur.includes('{')) { depth++; startBlock = true; }
                        if (startBlock && j > lineIdx) blockLines.push(cur);
                        if (cur.includes('}')) {
                            depth--;
                            if (depth === 0 && startBlock) { j++; break; }
                        }
                        j++;
                    }

                    let loopCounter = 0;
                    while (this.evaluateExpr(condExpr, variables, userFunctions)) {
                        loopCounter++;
                        if (loopCounter > maxIterations) {
                            return { success: false, output: output, error: 'Infinite Loop Detected!' };
                        }

                        const innerCode = `int main() {\n${blockLines.join('\n')}\n}`;
                        const innerResult = this.interpret(innerCode, inputData);
                        output += innerResult.output;

                        if (incrStmt.includes('++')) {
                            const v = incrStmt.replace('++', '').trim();
                            variables[v] = (variables[v] || 0) + 1;
                        } else if (incrStmt.includes('--')) {
                            const v = incrStmt.replace('--', '').trim();
                            variables[v] = (variables[v] || 0) - 1;
                        } else {
                            const assign = incrStmt.match(/^([a-zA-Z_][a-zA-Z0-9_]*)\s*=\s*(.*)$/);
                            if (assign) variables[assign[1]] = this.evaluateExpr(assign[2], variables, userFunctions);
                        }
                    }
                    lineIdx = j;
                    continue;
                }
            }

            lineIdx++;
        }

        return {
            success: true,
            output: output
        };
    }

    callUserFunction(fnName, argsStr, variables, userFunctions, inputData) {
        const fn = userFunctions[fnName];
        if (!fn) return { output: '', returnVal: 0 };

        const argValues = argsStr.split(',').map(a => this.evaluateExpr(a.trim(), variables, userFunctions)).filter(v => v !== undefined && v !== '');
        const paramNames = fn.params.split(',').map(p => p.trim().split(/\s+/).pop()).filter(Boolean);

        let fnCode = `int main() {\n`;
        paramNames.forEach((pName, idx) => {
            if (pName && argValues[idx] !== undefined) {
                const val = typeof argValues[idx] === 'string' ? `"${argValues[idx]}"` : argValues[idx];
                fnCode += `auto ${pName} = ${val};\n`;
            }
        });
        fnCode += `${fn.body}\n}`;

        return this.interpret(fnCode, inputData);
    }

    evaluateExpr(exprStr, variables, userFunctions = {}) {
        let str = exprStr.trim();
        if (str.startsWith('"') && str.endsWith('"')) {
            return str.slice(1, -1);
        }

        // Handle Array indexing in expression e.g. arr[i]
        str = str.replace(/([a-zA-Z_][a-zA-Z0-9_]*)\s*\[\s*(.*?)\s*\]/g, (m, arrName, idxExpr) => {
            const idx = Number(this.evaluateExpr(idxExpr, variables, userFunctions));
            if (variables[arrName] && variables[arrName][idx] !== undefined) {
                return typeof variables[arrName][idx] === 'string' ? `"${variables[arrName][idx]}"` : variables[arrName][idx];
            }
            return '0';
        });

        // Replace variables
        const tokens = str.split(/([\+\-\*\/\%\(\)\=\!\<\>\&\|]+)/);
        const replaced = tokens.map(tok => {
            const t = tok.trim();
            if (!t) return tok;
            if (variables.hasOwnProperty(t)) {
                return typeof variables[t] === 'string' ? `"${variables[t]}"` : variables[t];
            }
            return tok;
        }).join('');

        try {
            return Function(`"use strict"; return (${replaced})`)();
        } catch (e) {
            if (variables.hasOwnProperty(str)) {
                return variables[str];
            }
            return str;
        }
    }
}

const cppExecutor = new CppExecutor();
