import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { click, render, triggerKeyEvent } from '@ember/test-helpers';
import { hbs } from 'ember-cli-htmlbars';
import {
  assertListboxButton,
  assertListbox,
  ListboxState,
  getListboxButton,
} from '../../accessibility-assertions';
import { Keys } from 'ember-headlessui/utils/keyboard';

module('Integration | Component | <Listbox>', function (hooks) {
  setupRenderingTest(hooks);

  test('should be possible to render a Listbox without crashing', async function (assert) {
    await render(hbs`
      <Listbox as |listbox|>
        <listbox.Button data-test="my-custom-property">Trigger</listbox.Button>
        <listbox.Options as |options|>
          <options.Option>option</options.Option>
        </listbox.Options>
      </Listbox>
    `);
    assertListboxButton({
      state: ListboxState.InvisibleUnmounted,
      attributes: { 'data-test': 'my-custom-property' },
    });
    assertListbox({
      state: ListboxState.InvisibleUnmounted,
    });
  });

  test('should be possible to render a Listbox using a "open" property', async function (assert) {
    await render(hbs`
      <Listbox as |listbox|>
        <listbox.Button data-test="my-custom-property">Trigger</listbox.Button>
        {{#if listbox.open}}
          <listbox.Options as |options|>
            <options.Option>option</options.Option>
          </listbox.Options>
        {{/if}}
      </Listbox>
    `);
    assertListboxButton({
      state: ListboxState.InvisibleUnmounted,
      attributes: { 'data-test': 'my-custom-property' },
    });
    assertListbox({ state: ListboxState.InvisibleUnmounted });

    await click(getListboxButton());

    assertListboxButton({
      state: ListboxState.Visible,
      attributes: { 'data-test': 'my-custom-property' },
    });
    assertListbox({ state: ListboxState.Visible });
  });

  test('should be possible to disable a Listbox', async function (assert) {
    await render(hbs`
      <Listbox @disabled={{true}} as |listbox|>
        <listbox.Button data-test="my-custom-property">Trigger</listbox.Button>
        <listbox.Options as |options|>
          <options.Option>option</options.Option>
        </listbox.Options>
      </Listbox>
    `);
    assertListboxButton({
      state: ListboxState.InvisibleUnmounted,
      attributes: { 'data-test': 'my-custom-property' },
    });
    assertListbox({ state: ListboxState.InvisibleUnmounted });
  });

  module('<listbox.Label>', () => {
    test(
      'should be possible to render a <listbox.Label> using yielded props', async () => {
        await render(hbs`
          <Listbox as |listbox|>
            <listbox.Label as |label|>test</listbox.Label>
            <listbox.Button data-test="my-custom-property">Trigger</listbox.Button>
            <listbox.Options as |options|>
              <options.Option>option</options.Option>
            </listbox.Options>
          </Listbox>
        `);

        assertListboxButton({
          state: ListboxState.InvisibleUnmounted,
          attributes: { 'data-test': 'my-custom-property' },
        })
        //assertListboxLabel({
          //attributes: { id: 'headlessui-listbox-label-1' },
          //textContent: JSON.stringify({ open: false, disabled: false }),
        //})
        //assertListbox({ state: ListboxState.InvisibleUnmounted })

        //await click(getListboxButton())

        //assertListboxLabel({
          //attributes: { id: 'headlessui-listbox-label-1' },
          //textContent: JSON.stringify({ open: true, disabled: false }),
        //})
        //assertListbox({ state: ListboxState.Visible })
        //assertListboxLabelLinkedWithListbox()
        //assertListboxButtonLinkedWithListboxLabel()
      })
  })
});
