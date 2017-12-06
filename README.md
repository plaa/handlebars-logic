# handlebars-logic

`handlebars-logic.js` contains a number of Handlebars helpers that
allow performing boolean logic, comparisons and arithmetic operations
within Handlebars templates.

Operators use Lisp-style operator syntax, for example:

    a+b+c equals {{sum a b c}}}
    a is {{#if (gt a 10)}} greater than {{else}} less or equal to {{/if}} ten.
    {{#if (and (a lt 10) (b lt 10))}} Both a and b are less than ten. {{/if}}

Boolean operators:  `and` `or` (any number of arguments) `not` (one argument)

Comparison operators:  `eq` `ne` `lt` `gt` `lte` `gte` (two arguments, numbers or strings)

Arithmetic operators:  `sum` `sub` `mul` `div` (any number of arguments) `mod` (two arguments)

See `example.html` for more complete examples.

## Credits

This was written by Sampo Juustila and inspired by the
[Stack Overflow answer](https://stackoverflow.com/a/31632215/412896)
by kevlened.

Licensed under MIT license.
