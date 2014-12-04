# b_
[![NPM Version](https://badge.fury.io/js/b_.png)]
(https://npmjs.org/package/b_)
[![Build Status](https://travis-ci.org/azproduction/b_.png?branch=master)]
(https://travis-ci.org/azproduction/b_)

BEM class name formatter

## Example

**Simple**

```js
var b = require('b_');

// blocks
b('button', {size: 'xl'}) === 'button button_hidden button_size_xl';

// block elements
b('modal', 'close', {size: 'xl'}) === 'modal__close modal__close_hidden modal__close_size_xl';

// boolean modifiers
b('button', {hidden: false}) === 'button';
b('button', {hidden: true}) === 'button button_hidden';
```

**Alternative BEM syntax**

```js
var B = require('b_').B;
var b = B({
    tailSpace: ' ',
    elementSeparator: '-',
    modSeparator: '--',
    modValueSeparator: '-',
    classSeparator: ' '
});

b('block', 'elem', {mod1: true, mod2: false, mod3: 'mod3'}) === 'block-elem block-elem--mod1 block-elem--mod3-mod3 ';
```

**React example**

```js
var B = require('b_').B;
var b = B({tailSpace: ' '});

function render() {
    var classes = b('b-button', {
        size: this.props.size,
        disabled: this.state.disabled
    });
    
    // Mixins
    classes += b('b-icon', {type: this.props.iconType});
    
    return <div className={classes}>Great, I'll be there.</div>;
}
```
