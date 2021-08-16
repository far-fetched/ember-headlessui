import Qunit from 'qunit';

function getDialog() {
  return document.querySelector('[role="dialog"]');
}

function getDialogs() {
  return Array.from(document.querySelectorAll('[role="dialog"]'));
}

function getDialogOverlay() {
  return document.querySelector('[id$="-headlessui-dialog-overlay"]');
}

function getDialogTitle() {
  return document.querySelector('[id$="-headlessui-dialog-title"]');
}

function getDialogDescription() {
  return document.querySelector('[id$="-headlessui-dialog-description"]');
}

function getDialogOverlays() {
  return Array.from(
    document.querySelectorAll('[id$="-headlessui-dialog-overlay"]')
  );
}

function getListboxButton() {
  return document.querySelector('[role="button"]');
}

function getListbox() {
  return document.querySelector('[role="listbox"]');
}

const DialogState = {
  /** The dialog is visible to the user. */
  Visible: 'Visible',

  /** The dialog is **not** visible to the user. It's still in the DOM, but it is hidden. */
  InvisibleHidden: 'InvisibleHidden',

  /** The dialog is **not** visible to the user. It's not in the DOM, it is unmounted. */
  InvisibleUnmounted: 'InvisibleUnmounted',
};

const ListboxState = {
  Visible: 'Visible',
  InvisibleHidden: 'InvisibleHidden',
  InvisibleUnmounted: 'InvisibleUnmounted',
};

function assertNever(x) {
  throw new Error('Unexpected object: ' + x);
}

function assertActiveElement(element, comment) {
  try {
    if (element === null) {
      Qunit.assert.notEqual(element, null);
      return;
    }
    return Qunit.assert.waitFor(() => {
      Qunit.assert.equal(document.activeElement, element, comment);
    });
  } catch (err) {
    Error.captureStackTrace(err, assertActiveElement);
    throw err;
  }
}

function assertHidden(element) {
  try {
    if (element === null) {
      Qunit.assert.notEqual(element, null);
      return;
    }

    Qunit.assert.dom(element).hasAttribute('hidden');
    Qunit.assert.dom(element).hasStyle({ display: 'none' });
  } catch (err) {
    Error.captureStackTrace(err, assertHidden);
    throw err;
  }
}

function assertVisible(element) {
  try {
    if (element === null) {
      Qunit.assert.notEqual(element, null);
      return;
    }

    Qunit.assert.dom(element).doesNotHaveAttribute('hidden');
    Qunit.assert.dom(element).doesNotHaveStyle({ display: 'none' });
  } catch (err) {
    Error.captureStackTrace(err, assertVisible);
    throw err;
  }
}

function assertDialog(options, dialog = getDialog()) {
  options.attributes = options.attributes ?? {};

  if (!options.state) {
    Qunit.assert.notEqual(
      options.state,
      undefined,
      'You must provide an expected `state`'
    );

    return;
  }

  try {
    switch (options.state) {
      case DialogState.InvisibleHidden: {
        if (dialog === null) {
          Qunit.assert.notEqual(dialog, null);

          return;
        }

        assertHidden(dialog);

        Qunit.assert.dom(dialog).hasAttribute('role', 'dialog');
        Qunit.assert.dom(dialog).doesNotHaveAttribute('aria-modal');

        if (options.textContent) {
          Qunit.assert.dom(dialog).hasText(options.textContent);
        }

        for (let attributeName in options.attributes) {
          let attributeValue = options.attributes[attributeName];

          if (attributeName === 'class') {
            attributeValue = `ember-view ${attributeValue}`;
          }

          if (attributeName === 'id') {
            attributeValue = new RegExp(`${attributeValue}$`);
          }

          Qunit.assert.dom(dialog).hasAttribute(attributeName, attributeValue);
        }

        break;
      }

      case DialogState.Visible: {
        if (dialog === null) {
          Qunit.assert.notEqual(dialog, null);

          return;
        }

        assertVisible(dialog);

        Qunit.assert.dom(dialog).hasAttribute('role', 'dialog');
        Qunit.assert.dom(dialog).hasAttribute('aria-modal', 'true');

        if (options.textContent) {
          Qunit.assert.dom(dialog).hasText(options.textContent);
        }

        for (let attributeName in options.attributes) {
          let attributeValue = options.attributes[attributeName];

          if (attributeName === 'class') {
            attributeValue = `ember-view ${attributeValue}`;
          }

          if (attributeName === 'id') {
            attributeValue = new RegExp(`${attributeValue}$`);
          }

          Qunit.assert.dom(dialog).hasAttribute(attributeName, attributeValue);
        }

        break;
      }

      case DialogState.InvisibleUnmounted: {
        Qunit.assert.equal(dialog, null);
        break;
      }

      default: {
        assertNever(options.state);
      }
    }
  } catch (err) {
    Error.captureStackTrace(err, assertDialog);
    throw err;
  }
}

function assertDialogOverlay(options, overlay = getDialogOverlay()) {
  options.attributes = options.attributes ?? {};

  if (!options.state) {
    Qunit.assert.notEqual(
      options.state,
      undefined,
      'You must provide an expected `state`'
    );

    return;
  }

  try {
    switch (options.state) {
      case DialogState.InvisibleHidden: {
        if (overlay === null) {
          Qunit.assert.notEqual(overlay, null);

          return;
        }

        assertHidden(overlay);

        if (options.textContent) {
          Qunit.assert.dom(overlay).hasText(options.textContent);
        }

        for (let attributeName in options.attributes) {
          let attributeValue = options.attributes[attributeName];

          if (attributeName === 'class') {
            attributeValue = `ember-view ${attributeValue}`;
          }

          if (attributeName === 'id') {
            attributeValue = new RegExp(`${attributeValue}$`);
          }

          Qunit.assert.dom(overlay).hasAttribute(attributeName, attributeValue);
        }

        break;
      }

      case DialogState.Visible: {
        if (overlay === null) {
          Qunit.assert.notEqual(overlay, null);

          return;
        }

        assertVisible(overlay);

        if (options.textContent) {
          Qunit.assert.dom(overlay).hasText(options.textContent);
        }

        for (let attributeName in options.attributes) {
          let attributeValue = options.attributes[attributeName];

          if (attributeName === 'class') {
            attributeValue = `ember-view ${attributeValue}`;
          }

          if (attributeName === 'id') {
            attributeValue = new RegExp(`${attributeValue}$`);
          }

          Qunit.assert.dom(overlay).hasAttribute(attributeName, attributeValue);
        }

        break;
      }

      case DialogState.InvisibleUnmounted: {
        Qunit.assert.equal(overlay, null);

        break;
      }

      default: {
        assertNever(options.state);
      }
    }
  } catch (err) {
    Error.captureStackTrace(err, assertDialogOverlay);
    throw err;
  }
}

function assertDialogTitle(
  options,
  title = getDialogTitle(),
  dialog = getDialog()
) {
  options.attributes = options.attributes ?? {};

  if (!options.state) {
    Qunit.assert.notEqual(
      options.state,
      undefined,
      'You must provide an expected `state`'
    );

    return;
  }

  try {
    switch (options.state) {
      case DialogState.InvisibleHidden: {
        if (title === null) {
          Qunit.assert.notEqual(title, null);

          return;
        }

        if (dialog === null) {
          Qunit.assert.notEqual(dialog, null);

          return;
        }

        assertHidden(title);

        Qunit.assert.dom(title).hasAttribute('id');
        Qunit.assert.dom(dialog).hasAttribute('aria-labelledby', title.id);

        if (options.textContent) {
          Qunit.assert.dom(title).hasText(options.textContent);
        }

        for (let attributeName in options.attributes) {
          let attributeValue = options.attributes[attributeName];

          if (attributeName === 'class') {
            attributeValue = `ember-view ${attributeValue}`;
          }

          if (attributeName === 'id') {
            attributeValue = new RegExp(`${attributeValue}$`);
          }

          Qunit.assert.dom(title).hasAttribute(attributeName, attributeValue);
        }

        break;
      }

      case DialogState.Visible: {
        if (title === null) {
          Qunit.assert.notEqual(title, null);

          return;
        }

        if (dialog === null) {
          Qunit.assert.notEqual(dialog, null);

          return;
        }

        assertVisible(title);

        Qunit.assert.dom(title).hasAttribute('id');
        Qunit.assert.dom(dialog).hasAttribute('aria-labelledby', title.id);

        if (options.textContent) {
          Qunit.assert.dom(title).hasText(options.textContent);
        }

        for (let attributeName in options.attributes) {
          let attributeValue = options.attributes[attributeName];

          if (attributeName === 'class') {
            attributeValue = `ember-view ${attributeValue}`;
          }

          if (attributeName === 'id') {
            attributeValue = new RegExp(`${attributeValue}$`);
          }

          Qunit.assert.dom(title).hasAttribute(attributeName, attributeValue);
        }

        break;
      }

      case DialogState.InvisibleUnmounted: {
        Qunit.assert.equal(title, null);

        break;
      }

      default: {
        assertNever(options.state);
      }
    }
  } catch (err) {
    Error.captureStackTrace(err, assertDialogTitle);
    throw err;
  }
}

function assertDialogDescription(
  options,
  description = getDialogDescription(),
  dialog = getDialog()
) {
  options.attributes = options.attributes ?? {};

  if (!options.state) {
    Qunit.assert.notEqual(
      options.state,
      undefined,
      'You must provide an expected `state`'
    );

    return;
  }

  try {
    switch (options.state) {
      case DialogState.InvisibleHidden: {
        if (description === null) {
          Qunit.assert.notEqual(description, null);

          return;
        }

        if (dialog === null) {
          Qunit.assert.notEqual(dialog, null);

          return;
        }

        assertHidden(description);

        Qunit.assert.dom(description).hasAttribute('id');
        Qunit.assert
          .dom(dialog)
          .hasAttribute('aria-describedby', description.id);

        if (options.textContent) {
          Qunit.assert.dom(description).hasText(options.textContent);
        }

        for (let attributeName in options.attributes) {
          let attributeValue = options.attributes[attributeName];

          if (attributeName === 'class') {
            attributeValue = `ember-view ${attributeValue}`;
          }

          if (attributeName === 'id') {
            attributeValue = new RegExp(`${attributeValue}$`);
          }

          Qunit.assert
            .dom(description)
            .hasAttribute(attributeName, attributeValue);
        }

        break;
      }

      case DialogState.Visible: {
        if (description === null) {
          Qunit.assert.notEqual(description, null);

          return;
        }

        if (dialog === null) {
          Qunit.assert.notEqual(dialog, null);

          return;
        }

        assertVisible(description);

        Qunit.assert.dom(description).hasAttribute('id');
        Qunit.assert
          .dom(dialog)
          .hasAttribute('aria-describedby', description.id);

        if (options.textContent) {
          Qunit.assert.dom(description).hasText(options.textContent);
        }

        for (let attributeName in options.attributes) {
          let attributeValue = options.attributes[attributeName];

          if (attributeName === 'class') {
            attributeValue = `ember-view ${attributeValue}`;
          }

          if (attributeName === 'id') {
            attributeValue = new RegExp(`${attributeValue}$`);
          }

          Qunit.assert
            .dom(description)
            .hasAttribute(attributeName, attributeValue);
        }

        break;
      }

      case DialogState.InvisibleUnmounted: {
        Qunit.assert.equal(description, null);

        break;
      }

      default: {
        assertNever(options.state);
      }
    }
  } catch (err) {
    Error.captureStackTrace(err, assertDialogDescription);
    throw err;
  }
}

function getByText(text) {
  let walker = document.createTreeWalker(
    document.body,
    NodeFilter.SHOW_ELEMENT,
    {
      acceptNode(node) {
        if (node.children.length > 0) return NodeFilter.FILTER_SKIP;
        return NodeFilter.FILTER_ACCEPT;
      },
    }
  );

  while (walker.nextNode()) {
    if (walker.currentNode.textContent.trim() === text)
      return walker.currentNode;
  }

  return null;
}

function assertListboxButton(
  { state, attributes, textContent },
  button = getListboxButton()
) {
  try {
    if (button === null) return Qunit.assert.ok(button);
    Qunit.assert.dom(button).hasAttribute('id');
    Qunit.assert.dom(button).hasAria('haspopup', 'listbox');
    switch (state) {
      case ListboxState.InvisibleUnmounted: {
        Qunit.assert.dom(button).doesNotHaveAria('listbox');
        if (button.hasAttribute('disabled')) {
          Qunit.assert.dom(button).doesNotHaveAria('expanded');
          Qunit.assert.dom(button).isDisabled();
        } else {
          Qunit.assert.dom(button).hasAria('expanded', 'false');
        }
        break;
      }
      case ListboxState.Visible: {
        Qunit.assert.dom(button).hasAria('controls', { any: true });
        Qunit.assert.dom(button).hasAria('expanded', 'true');
        break;
      }
      default:
        Qunit.assert.ok(
          state,
          'you have to provide state to assertListboxButton'
        );
    }

    for (let attributeName in attributes) {
      Qunit.assert
        .dom(button)
        .hasAttribute(attributeName, attributes[attributeName]);
    }
  } catch (err) {
    Error.captureStackTrace(err, assertListboxButton);
    throw err;
  }
}

function assertListbox(
  { state, attributes, textContent },
  listbox = getListbox(),
  button = getListboxButton()
) {
  try {
    switch (state) {
      case ListboxState.InvisibleUnmounted: {
        Qunit.assert.dom(listbox).doesNotExist();
        break;
      }
      case ListboxState.Visible: {
        Qunit.assert.dom(listbox).isVisible();

        Qunit.assert.dom(listbox).hasAria('labelledby', { any: true });
        Qunit.assert.dom(listbox).hasAttribute('role', 'listbox');

        if (textContent) Qunit.assert.dom(listbox).hasText(textContent);

        for (let attributeName in attributes) {
          Qunit.assert
            .dom(listbox)
            .hasAttribute(attributeName, attributes[attributeName]);
        }
        break;
      }
      default:
        Qunit.assert.ok(state, 'you have to provide state to assertListbox');
    }

  } catch (err) {
    Error.captureStackTrace(err, assertListbox);
    throw err;
  }
}

export {
  DialogState,
  ListboxState,
  assertDialog,
  assertDialogDescription,
  assertDialogOverlay,
  assertDialogTitle,
  getDialog,
  getDialogs,
  getDialogOverlay,
  getDialogOverlays,
  assertActiveElement,
  getByText,
  assertListboxButton,
  assertListbox,
  getListboxButton,
};
