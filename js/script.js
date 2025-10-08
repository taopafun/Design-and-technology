/*
 * Generic quiz grading and modal helper functions.
 *
 * To use these helpers on a page, add a form with a unique
 * identifier containing radio inputs named q1, q2, ... and
 * specify the correct answers in an array.  When the user
 * presses the submit button, call gradeQuiz() with the form
 * identifier and answer key.  The result will be displayed
 * in a modal overlay.
 */

/**
 * Grades a quiz form against the provided answer key and
 * displays the score to the user in a modal.  The form must
 * contain radio inputs named q1, q2, etc. with values matching
 * the answer key entries.  Unanswered questions are counted
 * as incorrect.
 *
 * @param {string} formId Identifier of the form element.
 * @param {Array<string>} answerKey Array of correct answer values.
 */
function gradeQuiz(formId, correctAnswers) {
  const form = document.getElementById(formId);
  const questions = form.querySelectorAll('.question');
  let score = 0;
  let total = correctAnswers.length;

  // ล้างผลเดิมก่อน
  questions.forEach(q => {
    q.classList.remove('correct', 'incorrect');
    const oldMsg = q.querySelector('.feedback');
    if (oldMsg) oldMsg.remove();
  });

  // ตรวจคำตอบแต่ละข้อ
  questions.forEach((question, index) => {
    const selected = question.querySelector('input[type="radio"]:checked');
    const feedback = document.createElement('p');
    feedback.classList.add('feedback');

    if (selected && selected.value === correctAnswers[index]) {
      score++;
      question.classList.add('correct');
      feedback.textContent = `✅ ข้อ ${index + 1}: ถูกต้อง!`;
      feedback.style.color = 'green';
    } else {
      question.classList.add('incorrect');
      feedback.textContent = `❌ ข้อ ${index + 1}: ผิด (คำตอบที่ถูกคือ "${correctAnswers[index]}")`;
      feedback.style.color = 'red';
    }
    question.appendChild(feedback);
  });

  // แสดงผลรวมคะแนน
  const modal = document.getElementById('modal');
  const overlay = document.getElementById('modal-overlay');
  modal.querySelector('p').innerHTML = `คุณได้ ${score} จาก ${total} คะแนน`;
  overlay.style.display = 'flex';
}

function hideModal() {
  document.getElementById('modal-overlay').style.display = 'none';
}


/**
 * Shows a modal with the given title and message.
 * The page must contain elements with IDs 'modal-overlay' and
 * 'modal' and inside the modal a <h4> and <p> for the text.
 *
 * @param {string} title The title of the modal.
 * @param {string} message The message to display.
 */
function showModal(title, message) {
  const overlay = document.getElementById('modal-overlay');
  const modal = document.getElementById('modal');
  if (!overlay || !modal) return;
  const h4 = modal.querySelector('h4');
  const p = modal.querySelector('p');
  if (h4) h4.textContent = title;
  if (p) p.textContent = message;
  overlay.style.display = 'flex';
}

/**
 * Hides the currently displayed modal.
 */
function hideModal() {
  const overlay = document.getElementById('modal-overlay');
  if (overlay) overlay.style.display = 'none';
}
