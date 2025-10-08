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
function gradeQuiz(formId, answerKey) {
  const form = document.getElementById(formId);
  let score = 0;
  for (let i = 0; i < answerKey.length; i++) {
    const qName = 'q' + (i + 1);
    const selected = form.querySelector('input[name="' + qName + '"]:checked');
    if (selected && selected.value === answerKey[i]) {
      score++;
    }
  }
  const total = answerKey.length;
  const message = `คุณทำได้ ${score} จาก ${total} คะแนน`;
  showModal('ผลการทดสอบ', message);
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