# b_

[![NPM Version](https://badge.fury.io/js/b_.png)](https://npmjs.org/package/b_)
[![Build Status](https://travis-ci.org/azproduction/b_.png?branch=master)](https://travis-ci.org/azproduction/b_)

BEM class name formatter

## Example

### Simple

```js
var b = require('b_');

// blocks
b('button', {size: 'xl'}) === 'button button_size_xl';

// block elements
b('modal', 'close', {size: 'xl'}) === 'modal__close modal__close_size_xl';

// boolean modifiers
b('button', {hidden: false}) === 'button';
b('button', {hidden: true}) === 'button button_hidden';
```

### Alternative BEM syntax

```js
var B = require('b_').B;
var b = B({
    tailSpace: ' ',
    elementSeparator: '-',
    modSeparator: '--',
    modValueSeparator: '-',
    classSeparator: ' '
});

b('block', 'elem', {mod1: true, mod2: false, mod3: 'mod3'}) ===
'block-elem block-elem--mod1 block-elem--mod3-mod3 ';
```

### [BEViS](https://github.com/bevis-ui/docs) syntax

```js
var B = require('b_').B;
var b = B({isFullModifier: false});

b('button_call-for-action', {disabled: true, focused: 'yes'}) ===
'button_call-for-action _disabled _focused_yes';
```

### Full bool values in modifiers

```js
var B = require('b_').B;
var b = B({isFullBoolValue: true});

b('button', {disabled: true, focused: false}) ===
'button button_disabled_true button_focused_false';
```

### React example

```jsx
var b = require('b_').with('b-button');
// or
var b = require('b_').lock('b-button');
// which is `require('b_').bind(null, 'b-button');` but much convenient

function render() {
    return (
        <div className={b()}>
            <span className={b('icon', {type: 'add'})}></span>
            <span className={b('text')}></span>
        </div>
        <div className={b({size: 'small'})}>
            <span className={b('icon', {type: 'add'})}></span>
            <span className={b('text')}></span>
        </div>
    );
}
```
