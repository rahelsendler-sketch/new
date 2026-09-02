/**
 * ASAH C++ — Progress Store (LocalStorage Persistence)
 * Tracks user progress, XP, level, streak, completed lessons, and test attempts.
 */

class ProgressStore {
    constructor() {
        this.STORAGE_KEY = 'asah_cpp_user_progress_v1';
        this.data = this.load();
    }

    load() {
        const defaultData = {
            displayName: 'Pelajar C++',
            level: 1,
            xp: 0,
            streak: 1,
            lastActiveDate: new Date().toISOString().split('T')[0],
            completedLessons: [],
            currentLessonId: 'lesson-1',
            questionHistory: {}, // { qId: { attempts: 1, isCorrect: true } }
            challengeHistory: {} // { cId: { attempts: 1, isPassed: true, code: '' } }
        };

        try {
            const raw = localStorage.getItem(this.STORAGE_KEY);
            if (!raw) return defaultData;
            return { ...defaultData, ...JSON.parse(raw) };
        } catch (e) {
            console.warn('LocalStorage load error, using default progress data', e);
            return defaultData;
        }
    }

    save() {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(this.data));
        } catch (e) {
            console.error('LocalStorage save error', e);
        }
    }

    addXP(points) {
        this.data.xp += points;
        // Level up formula: 1 level per 250 XP
        const newLevel = Math.floor(this.data.xp / 250) + 1;
        this.data.level = newLevel;
        this.save();
        return { xp: this.data.xp, level: newLevel };
    }

    markLessonComplete(lessonId, xpReward = 100) {
        if (!this.data.completedLessons.includes(lessonId)) {
            this.data.completedLessons.push(lessonId);
            this.addXP(xpReward);
        }
        this.save();
    }

    setCurrentLesson(lessonId) {
        this.data.currentLessonId = lessonId;
        this.save();
    }

    recordQuestionAttempt(questionId, isCorrect) {
        if (!this.data.questionHistory[questionId]) {
            this.data.questionHistory[questionId] = { attempts: 0, isCorrect: false };
        }
        this.data.questionHistory[questionId].attempts += 1;
        if (isCorrect) {
            this.data.questionHistory[questionId].isCorrect = true;
        }
        this.save();
    }

    recordChallengeAttempt(challengeId, isPassed, codeSubmitted) {
        if (!this.data.challengeHistory[challengeId]) {
            this.data.challengeHistory[challengeId] = { attempts: 0, isPassed: false, code: '' };
        }
        this.data.challengeHistory[challengeId].attempts += 1;
        this.data.challengeHistory[challengeId].code = codeSubmitted;
        if (isPassed) {
            this.data.challengeHistory[challengeId].isPassed = true;
        }
        this.save();
    }

    resetAllProgress() {
        localStorage.removeItem(this.STORAGE_KEY);
        this.data = this.load();
    }
}

const progressStore = new ProgressStore();
