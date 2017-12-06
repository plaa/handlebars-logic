
function render(template, data) {
  return Handlebars.compile(template)(data);
}


QUnit.test( "eq", function( assert ) {
  assert.equal(render("{{eq 1 1}}"), "true");
  assert.equal(render("{{eq 1 2}}"), "false");
  assert.equal(render("{{eq 1 '1'}}"), "false");
  assert.equal(render("{{eq a 'str'}}", {a:"str"}), "true");
  assert.equal(render("{{#if (eq a 'str')}}YES{{else}}NO{{/if}}", {a:"str"}), "YES");
  assert.equal(render("{{#if (eq a 'str')}}YES{{else}}NO{{/if}}", {a:"foo"}), "NO");
});

QUnit.test( "ne", function( assert ) {
  assert.equal(render("{{ne 1 1}}"), "false");
  assert.equal(render("{{ne 1 2}}"), "true");
  assert.equal(render("{{ne 1 '1'}}"), "true");
  assert.equal(render("{{ne a 'str'}}", {a:"foo"}), "true");
  assert.equal(render("{{#if (ne a 'str')}}YES{{else}}NO{{/if}}", {a:"str"}), "NO");
  assert.equal(render("{{#if (ne a 'str')}}YES{{else}}NO{{/if}}", {a:"foo"}), "YES");
});

QUnit.test( "lt", function( assert ) {
  assert.equal(render("{{lt 1 2}}"), "true");
  assert.equal(render("{{lt 2 1}}"), "false");
  assert.equal(render("{{lt 2 2}}"), "false");
  assert.equal(render("{{lt a b}}", {a:1, b:"2"}), "true");
  assert.equal(render("{{lt b a}}", {a:1, b:"2"}), "false");
  assert.equal(render("{{lt b b}}", {a:1, b:"2"}), "false");
  assert.equal(render("{{#if (lt a b)}}YES{{else}}NO{{/if}}", {a:1, b:"2"}), "YES");
  assert.equal(render("{{#if (lt b a)}}YES{{else}}NO{{/if}}", {a:1, b:"2"}), "NO");
});

QUnit.test( "gt", function( assert ) {
  assert.equal(render("{{gt 1 2}}"), "false");
  assert.equal(render("{{gt 2 1}}"), "true");
  assert.equal(render("{{gt 2 2}}"), "false");
  assert.equal(render("{{gt a b}}", {a:1, b:"2"}), "false");
  assert.equal(render("{{gt b a}}", {a:1, b:"2"}), "true");
  assert.equal(render("{{gt b b}}", {a:1, b:"2"}), "false");
  assert.equal(render("{{#if (gt a b)}}YES{{else}}NO{{/if}}", {a:1, b:"2"}), "NO");
  assert.equal(render("{{#if (gt b a)}}YES{{else}}NO{{/if}}", {a:1, b:"2"}), "YES");
});

QUnit.test( "lte", function( assert ) {
  assert.equal(render("{{lte 1 2}}"), "true");
  assert.equal(render("{{lte 2 1}}"), "false");
  assert.equal(render("{{lte 2 2}}"), "true");
  assert.equal(render("{{lte a b}}", {a:1, b:"2"}), "true");
  assert.equal(render("{{lte b a}}", {a:1, b:"2"}), "false");
  assert.equal(render("{{lte b b}}", {a:1, b:"2"}), "true");
  assert.equal(render("{{#if (lte a b)}}YES{{else}}NO{{/if}}", {a:1, b:"2"}), "YES");
  assert.equal(render("{{#if (lte b a)}}YES{{else}}NO{{/if}}", {a:1, b:"2"}), "NO");
});

QUnit.test( "gte", function( assert ) {
  assert.equal(render("{{gte 1 2}}"), "false");
  assert.equal(render("{{gte 2 1}}"), "true");
  assert.equal(render("{{gte 2 2}}"), "true");
  assert.equal(render("{{gte a b}}", {a:1, b:"2"}), "false");
  assert.equal(render("{{gte b a}}", {a:1, b:"2"}), "true");
  assert.equal(render("{{gte b b}}", {a:1, b:"2"}), "true");
  assert.equal(render("{{#if (gte a b)}}YES{{else}}NO{{/if}}", {a:1, b:"2"}), "NO");
  assert.equal(render("{{#if (gte b a)}}YES{{else}}NO{{/if}}", {a:1, b:"2"}), "YES");
});

QUnit.test( "and", function( assert ) {
  assert.equal(render("{{and true 1 'str'}}"), "true");
  assert.equal(render("{{and false 1 'str'}}"), "false");
  assert.equal(render("{{and true 0 'str'}}"), "false");
  assert.equal(render("{{and true 1 ''}}"), "false");
  assert.equal(render("{{and b n s}}", {b:true, n:1, s:'str'}), "true");
  assert.equal(render("{{and b n s}}", {b:false, n:1, s:'str'}), "false");
  assert.equal(render("{{and b n s}}", {b:true, n:0, s:'str'}), "false");
  assert.equal(render("{{and b n s}}", {b:true, n:1, s:''}), "false");
  assert.equal(render("{{and b n s}}", {n:1, s:'str'}), "false");
  assert.equal(render("{{#if (and true 1 'str')}}YES{{else}}NO{{/if}}"), "YES");
  assert.equal(render("{{#if (and true 0 'str')}}YES{{else}}NO{{/if}}"), "NO");
});

QUnit.test( "or", function( assert ) {
  assert.equal(render("{{or false 0 ''}}"), "false");
  assert.equal(render("{{or true 0 ''}}"), "true");
  assert.equal(render("{{or false 1 ''}}"), "true");
  assert.equal(render("{{or false 0 'str'}}"), "true");
  assert.equal(render("{{or b n s}}", {b:false, n:0, s:''}), "false");
  assert.equal(render("{{or b n s}}", {b:true, n:0, s:''}), "true");
  assert.equal(render("{{or b n s}}", {b:false, n:1, s:''}), "true");
  assert.equal(render("{{or b n s}}", {b:false, n:0, s:'str'}), "true");
  assert.equal(render("{{or b n s}}", {s:'str'}), "true");
  assert.equal(render("{{or b n s}}", {}), "false");
  assert.equal(render("{{#if (or false 1 '')}}YES{{else}}NO{{/if}}"), "YES");
  assert.equal(render("{{#if (or false 0 '')}}YES{{else}}NO{{/if}}"), "NO");
});

QUnit.test( "not", function( assert ) {
  assert.equal(render("{{not false}}"), "true");
  assert.equal(render("{{not true}}"), "false");
  assert.equal(render("{{not 1}}"), "false");
  assert.equal(render("{{not 'str'}}"), "false");
  assert.equal(render("{{not bool}}", {bool:true}), "false");
  assert.equal(render("{{not bool}}", {}), "true");
  assert.equal(render("{{#if (not bool)}}YES{{else}}NO{{/if}}", {bool:true}), "NO");
  assert.equal(render("{{#if (not bool)}}YES{{else}}NO{{/if}}", {bool:false}), "YES");
});

QUnit.test( "sum", function( assert ) {
  assert.equal(render("{{sum 1 2 3}}"), "6");
  assert.equal(render("{{sum a b c}}", {a:1, b:-2, c:3}), "2");
});

QUnit.test( "sub", function( assert ) {
  assert.equal(render("{{sub 1 2 3}}"), "-4");
  assert.equal(render("{{sub a b c}}", {a:1, b:-2, c:3}), "0");
});

QUnit.test( "mul", function( assert ) {
  assert.equal(render("{{mul 1.5 2 5}}"), "15");
  assert.equal(render("{{mul a b c}}", {a:1.5, b:-2, c:5}), "-15");
});

QUnit.test( "div", function( assert ) {
  assert.equal(render("{{div 1 2 5}}"), "0.1");
  assert.equal(render("{{div a b c}}", {a:1, b:-2, c:5}), "-0.1");
});

QUnit.test( "mod", function( assert ) {
  assert.equal(render("{{mod 13 5}}"), "3");
  assert.equal(render("{{mod 13.5 5}}"), "3.5");
  assert.equal(render("{{mod -13 5}}"), "-3");
});
