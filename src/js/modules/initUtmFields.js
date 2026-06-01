export function initUtmFields() {
  const urlParams = new URLSearchParams(window.location.search);
  const utmFields = ['utm_source', 'utm_medium', 'utm_term', 'utm_content', 'utm_campaign'];

  document.querySelectorAll('form').forEach((form) => {
    utmFields.forEach((fieldName) => {
      const field = form.querySelector(`input[name="${fieldName}"]`);
      if (!field) return;

      field.value = urlParams.get(fieldName) || '';
    });
  });
}