(() => {
  const loadTimestamp = Date.now();

  function getFormData(form) {
    const elements = form.elements;
    const honeypotNames = ["itsatrap", "_gotcha"];
    let honeypotFilled = false;

    const fields = Object.keys(elements).filter((k) => {
      if (honeypotNames.includes(elements[k].name)) {
        if (elements[k].value) honeypotFilled = true;
        return false;
      }
      return true;
    }).map((k) => {
      if (elements[k].name !== undefined) {
        return elements[k].name;
      } else if (elements[k].length > 0) {
        return elements[k].item(0).name;
      }
    }).filter((item, pos, self) => self.indexOf(item) === pos && item);

    const formData = {};
    for (const name of fields) {
      const element = elements[name];
      formData[name] = element.value;

      if (element.length) {
        const data = [];
        for (let i = 0; i < element.length; i++) {
          const item = element.item(i);
          if (item.checked || item.selected) {
            data.push(item.value);
          }
        }
        formData[name] = data.join(", ");
      }
    }

    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses";

    return { data: formData, honeypotFilled };
  }

  function handleFormSubmit(event) {
    event.preventDefault();
    const form = event.target;
    const { data, honeypotFilled } = getFormData(form);

    if (honeypotFilled || data.submit) {
      return false;
    }

    const elapsed = Date.now() - loadTimestamp;
    if (elapsed < 3000) {
      return false;
    }

    data._token = btoa(String(loadTimestamp));
    data._origin = window.location.origin;

    showElement(form, ".error-message", false);
    disableAllInputs(form);

    const url = `https://script.google.com/macros/s/${form.dataset.scriptId}/exec`;

    fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body: new URLSearchParams(data).toString(),
    })
      .then((response) => response.json())
      .then((json) => {
        if (json.result === "success") {
          form.reset();
          showElement(form, ".form-elements", false);
          showElement(form, ".thankyou-message", true);
        } else {
          showElement(form, ".error-message", true);
          enableAllInputs(form);
        }
      })
      .catch(() => {
        showElement(form, ".error-message", true);
        enableAllInputs(form);
      });
  }

  function showElement(form, selector, show) {
    const el = form.querySelector(selector);
    if (el) {
      el.style.display = show ? "block" : "none";
      return true;
    }
    return false;
  }

  function disableAllInputs(form) {
    form.querySelectorAll("button, input[type=submit]").forEach((el) => { el.disabled = true; });
  }

  function enableAllInputs(form) {
    form.querySelectorAll("button, input[type=submit]").forEach((el) => { el.disabled = false; });
  }

  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll("form.contact-form").forEach((form) => {
      form.addEventListener("submit", handleFormSubmit);
    });
  });
})();
