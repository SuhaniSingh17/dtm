document.addEventListener('DOMContentLoaded', function() {
    const courses = [
        { id: 1, name: 'Mathematics', totalClasses: 50, attendedClasses: 40 },
        { id: 2, name: 'Physics', totalClasses: 45, attendedClasses: 35 },
        { id: 3, name: 'Computer Science', totalClasses: 60, attendedClasses: 55 },
        { id: 4, name: 'English', totalClasses: 40, attendedClasses: 30 }
    ];

    const events = [
        { id: 1, name: 'Mathematics Test', date: '2023-06-20', type: 'test' },
        { id: 2, name: 'Physics Assignment Due', date: '2023-06-22', type: 'assignment' },
        { id: 3, name: 'Semester Fee Payment', date: '2023-06-25', type: 'fee' },
        { id: 4, name: 'English Presentation', date: '2023-06-28', type: 'test' },
        { id: 5, name: 'Computer Science Project Submission', date: '2023-06-30', type: 'assignment' }
    ];

    const overallAttendance = calculateOverallAttendance(courses);
    document.getElementById('overall-attendance').textContent = `${overallAttendance}%`;
    document.getElementById('attendance-progress').value = overallAttendance;

    const attendanceStatus = overallAttendance >= 75 ? 'You\'re on track!' : 'Needs improvement';
    document.getElementById('attendance-status').textContent = attendanceStatus;

    const courseBreakdown = document.getElementById('course-breakdown');
    courses.forEach(course => {
        const attendancePercentage = Math.round((course.attendedClasses / course.totalClasses) * 100);
        const missableClasses = calculateMissableClasses(course.totalClasses, course.attendedClasses);
        
        courseBreakdown.innerHTML += `
            <div class="card">
                <div class="card-header">
                    <h3 class="text-sm font-medium">${course.name}</h3>
                </div>
                <div class="card-content">
                    <p><strong>Attendance:</strong> ${attendancePercentage}%</p>
                    <progress id="attendance-progress" class="progress-bar" value="${attendancePercentage}" max="100"></progress>
                    <p><strong>Missable Classes:</strong> ${missableClasses} more classes</p>
                </div>
            </div>
        `;
    });

    const upcomingEvents = document.getElementById('upcoming-events');
    events.forEach(event => {
        upcomingEvents.innerHTML += `
            <div class="card">
                <h4 class="text-sm font-medium">${event.name}</h4>
                <p>${event.date}</p>
            </div>
        `;
    });

    document.getElementById('dark-mode-toggle').addEventListener('click', function() {
        document.body.classList.toggle('dark');
    });

    document.getElementById('plan-holidays-btn').addEventListener('click', function() {
        document.getElementById('holiday-planner-dialog').showModal();
    });

    document.getElementById('send-btn').addEventListener('click', function() {
        const chatInput = document.getElementById('chat-input');
        if (chatInput.value.trim() !== '') {
            document.getElementById('chat-area').innerHTML += `<div>${chatInput.value}</div>`;
            chatInput.value = '';
        }
    });
});

function calculateOverallAttendance(courses) {
    const totalClasses = courses.reduce((sum, course) => sum + course.totalClasses, 0);
    const attendedClasses = courses.reduce((sum, course) => sum + course.attendedClasses, 0);
    return Math.round((attendedClasses / totalClasses) * 100);
}

function calculateMissableClasses(totalClasses, attendedClasses) {
    const requiredAttendance = Math.ceil(0.75 * totalClasses);
    return attendedClasses - requiredAttendance;
}
