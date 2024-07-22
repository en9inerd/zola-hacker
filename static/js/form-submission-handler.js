(function () {
  // get all data in form and return object
  function getFormData(form) {
    const elements = form.elements;
    let itsatrap;

    const fields = Object.keys(elements).filter((k) => {
      if (elements[k].name === "itsatrap") {
        itsatrap = elements[k].value;
        return false;
      }
      return true;
    }).map((k) => {
      if (elements[k].name !== undefined) {
        return elements[k].name;
        // special case for Edge's html collection
      } else if (elements[k].length > 0) {
        return elements[k].item(0).name;
      }
    }).filter((item, pos, self) => {
      return self.indexOf(item) == pos && item;
    });

    const formData = {};
    fields.forEach((name) => {
      const element = elements[name];

      // singular form elements just have one value
      formData[name] = element.value;

      // when our element has multiple items, get their values
      if (element.length) {
        const data = [];
        for (let i = 0; i < element.length; i++) {
          const item = element.item(i);
          if (item.checked || item.selected) {
            data.push(item.value);
          }
        }
        formData[name] = data.join(', ');
      }
    });

    // add form-specific values into the data
    formData.formDataNameOrder = JSON.stringify(fields);
    formData.formGoogleSheetName = form.dataset.sheet || "responses"; // default sheet name
    formData.formGoogleSendEmail
      = form.dataset.email || ""; // no email by default

    return { data: formData, itsatrap };
  }

  function handleFormSubmit(event) {
    event.preventDefault(); // we are submitting via fetch below
    const form = event.target;
    const formData = getFormData(form);
    const data = formData.data;

    // If a itsatrap field is filled, assume it was done so by a spam bot.
    if (formData.itsatrap || data.submit) {
      return false;
    }

    disableAllButtons(form);
    const url = `https://script.google.com/macros/s/${form.dataset.scriptId}/exec`;

    fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      body: new URLSearchParams(data).toString(),
    })
      .then((response) => {
        if (response.ok) {
          form.reset();
          const formElements = form.querySelector(".form-elements");
          if (formElements) {
            formElements.style.display = "none"; // hide form
          }
          const thankYouMessage = form.querySelector(".thankyou-message");
          if (thankYouMessage) {
            thankYouMessage.style.display = "block";
          }
        }
      })
      .catch((error) => {
        console.error('Error submitting the form:', error);
      });
  }

  function loaded() {
    // bind to the submit event of our form
    const forms = document.querySelectorAll("form.contact-form");
    forms.forEach((form) => {
      form.addEventListener("submit", handleFormSubmit, false);
    });
  };
  document.addEventListener("DOMContentLoaded", loaded, false);

  function disableAllButtons(form) {
    const buttons = form.querySelectorAll("button");
    buttons.forEach((button) => {
      button.disabled = true;
    });
  }
})();
