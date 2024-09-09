// register.js

// Registration deadline (1st of October)
const registrationDeadline = new Date('September 11, 2024');
const currentDate = new Date();

// Display deadline message and fine if past deadline
const deadlineMessage = document.getElementById('deadline-message');
const fineMessage = document.getElementById('fine-message');

if (currentDate > registrationDeadline) {
    deadlineMessage.innerText = "Registration is closed. A fine of N5,000 is required to be eligible. Find remit details below.";
    fineMessage.classList.remove('hidden');
} else {
    const daysLeft = Math.ceil((registrationDeadline - currentDate) / (1000 * 60 * 60 * 24));
    deadlineMessage.innerText = `Registration closes in ${daysLeft} days.`;
}

// Handle form submission and save to localStorage
document.getElementById('registration-form').addEventListener('submit', function (e) {
    e.preventDefault();
    
    const schoolName = document.getElementById('school-name').value.trim();
    const candidateName = document.getElementById('candidate-name').value.trim();
    const studentId = document.getElementById('student-id').value.trim();

    if (!schoolName || !candidateName || !studentId) {
        alert('Please fill out all fields.');
        return;
    }

    const schoolData = {
        schoolName,
        candidateName,
        studentId,
        registeredDate: currentDate.toISOString(),
        fine: currentDate > registrationDeadline ? 5000 : 0
    };

    // Save to localStorage
    let registrations = JSON.parse(localStorage.getItem('registrations')) || [];
    registrations.push(schoolData);
    localStorage.setItem('registrations', JSON.stringify(registrations));

    // Show success message and clear form for next entry
    alert(`${candidateName} from ${schoolName} successfully registered!`);
    document.getElementById('candidate-name').value = '';
    document.getElementById('student-id').value = '';
    // Keep the school name for the next student
});

// Handle 'Done' button click
document.getElementById('done-button').addEventListener('click', function () {
    window.location.href = 'login.html';
});
