// Contact form → Google Forms via hidden iframe
// Field IDs and entry IDs preserved verbatim from the original script.
const form = document.getElementById('contact-form') as HTMLFormElement | null;
const response = document.getElementById('contact-response');

if (form && response) {
  const hiddenFrame = document.createElement('iframe');
  hiddenFrame.name = 'hidden-google-frame';
  hiddenFrame.style.display = 'none';
  document.body.appendChild(hiddenFrame);

  form.addEventListener('submit', (e) => {
    e.preventDefault();

    const gForm = document.createElement('form');
    gForm.method = 'POST';
    gForm.action =
      'https://docs.google.com/forms/d/e/1FAIpQLSeBu-qZZy-Gj-BKTw-17isboKMTt1g150IbHqcEGQemUUIUTA/formResponse';
    gForm.target = 'hidden-google-frame';
    gForm.style.display = 'none';

    const val = (id: string) =>
      (document.getElementById(id) as HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement | null)?.value ?? '';

    const fields: Record<string, string> = {
      'entry.318120689': val('c-name'),
      'entry.281475272': val('c-phone'),
      'entry.563634571': val('c-email'),
      'entry.1245430311': val('c-business'),
      'entry.1754937528': val('c-type'),
      'entry.474141800': val('c-calls'),
      'entry.2026719459': val('c-pain'),
    };

    for (const key in fields) {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = fields[key];
      gForm.appendChild(input);
    }

    document.body.appendChild(gForm);
    gForm.submit();
    document.body.removeChild(gForm);

    response.textContent = 'Thank you. We’ll reach out within 24 hours.';
    response.classList.add('success');
    form.reset();
  });
}
