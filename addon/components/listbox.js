import Component from '@glimmer/component';
import { tracked } from '@glimmer/tracking';
import { guidFor } from '@ember/object/internals';

export default class ListboxComponent extends Component {
  guid = `${guidFor(this)}-headlessui-listbox`;

  @tracked
  isOpen = false;
}
