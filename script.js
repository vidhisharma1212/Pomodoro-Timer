new Vue({
    el: '#app',
    data: {
        timerDuration: 25 * 60, 
        shortBreakDuration: 5 * 60, 
        longBreakDuration: 15 * 60, 
        currentTime: 0,
        timer_is_on: false,
        timer_is_paused: false,
        completedSessions: 0,
        tasks: [],
        newTask: '',
        timerInterval: null 
    },
    computed: {
        formatTime() {
            let minutes = Math.floor(this.currentTime / 60);
            let seconds = this.currentTime % 60;
            return `${this.padTime(minutes)}:${this.padTime(seconds)}`;
        },
        all_tasks_done() {
            if (this.tasks.length === 0) {
                return false; 
            }
            return this.tasks.every(task => task.completed);
        }
    },
    methods: {
        timer_starts(duration) {
            this.timer_is_on = true;
            this.currentTime = duration;

            this.timerInterval = setInterval(() => {
                if (this.timer_is_on && this.currentTime > 0) {
                    this.currentTime--;
                } else {
                    this.timer_is_on = false;
                    clearInterval(this.timerInterval);
                }
            }, 1000);
        },
        pauseTimer() {
            this.timer_is_paused = true; 
            clearInterval(this.timerInterval);
        },
        resetTimer() {
            this.timer_is_on = false; 
            clearInterval(this.timerInterval);
            this.currentTime = 0; 
        },
        addTask() {
            if (this.newTask.trim() !== '') {
                this.tasks.push({ description: this.newTask.trim(), completed: false });
                this.newTask = '';
            }
        },
        padTime(time) {
            return (time < 10 ? '0' : '') + time;
        }
    }
});