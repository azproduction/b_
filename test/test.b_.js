/*global describe, it, beforeEach, afterEach*/
/*jshint expr:true*/

var b_ = require('..'),
    B = b_.B,
    expect = require('chai').expect;

describe('b_', function () {

    var cases = [
        ['block'],
        ['block', {a: 1, b: 2}],
        ['block', {a: true, b: false, c: 1}],
        ['block', 'element'],
        ['block', 'element', {a: 1, b: 2}]
    ];

    var overrideableOptions = {
        tailSpace: '{tailSpace}',
        elementSeparator: '{elementSeparator}',
        modSeparator: '{modSeparator}',
        modValueSeparator: '{modValueSeparator}',
        classSeparator: '{classSeparator}'
    };

    it('is alias to new B().stringify', function () {

        cases.forEach(function (item) {
            var b = new B();
            expect(b_.apply(null, item)).to.eql(b.stringify.apply(b, item));
        });
    });

    describe('new b_.B()', function () {

        it('overrides default format', function () {
            var b = new B(overrideableOptions);

            Object.keys(overrideableOptions).forEach(function (key) {
                expect(b).to.have.property(key, overrideableOptions[key]);
            });

            expect(b.stringify('[block]', '[element]', {'[modifier]': '[value]'})).to.eql(
                '[block]{elementSeparator}[element]{classSeparator}' +
                '[block]{elementSeparator}[element]{modSeparator}[modifier]{modValueSeparator}[value]{tailSpace}'
            );
        });

        describe('.stringify()', function () {
            /*jshint maxstatements: 20 */

            var b;

            beforeEach(function () {
                b = new B();
            });

            it('accepts only block', function () {
                expect(b.stringify('block')).to.eql('block');
            });

            it('accepts block and modifiers', function () {
                expect(b.stringify('block', {a: 1, b: 2})).to.eql('block block_a_1 block_b_2');
            });

            it('handles boolean modifiers', function () {
                expect(b.stringify('block', {a: true, b: false, c: 1})).to.eql('block block_a block_c_1');
            });

            it('ignores prototype properties of modifiers', function () {
                expect(b.stringify('block', Object.create({a: true, b: false, c: 1}))).to.eql('block');
            });

            it('handles block and element', function () {
                expect(b.stringify('block', 'element')).to.eql('block__element');
            });

            it('handles block, element and modifiers', function () {
                expect(b.stringify('block', 'element', {a: 1, b: 2})).to.eql('block__element block__element_a_1 block__element_b_2');
            });

            it('can have tailSpace', function () {
                b = new B({tailSpace: ' '});
                expect(b.stringify('block')).to.eql('block ');
            });

            it('can have different elementSeparator', function () {
                b = new B({elementSeparator: '--'});
                expect(b.stringify('block', 'element')).to.eql('block--element');
            });

            it('can have different modSeparator', function () {
                b = new B({modSeparator: '^'});
                expect(b.stringify('block', {a: 1, b: 2})).to.eql('block block^a_1 block^b_2');
            });

            it('can have different modValueSeparator', function () {
                b = new B({modValueSeparator: '^'});
                expect(b.stringify('block', {a: 1, b: 2})).to.eql('block block_a^1 block_b^2');
            });

            it('can have different classSeparator', function () {
                b = new B({classSeparator: '\t'});
                expect(b.stringify('block', {a: 1, b: 2})).to.eql('block\tblock_a_1\tblock_b_2');
            });

        });

    });

    describe('b_.B()', function () {
        it('overrides default format', function () {
            var b = B(overrideableOptions);

            expect(b('[block]', '[element]', {'[modifier]': '[value]'})).to.eql(
                '[block]{elementSeparator}[element]{classSeparator}' +
                '[block]{elementSeparator}[element]{modSeparator}[modifier]{modValueSeparator}[value]{tailSpace}'
            );
        });

        it('is alias to new B().stringify', function () {

            cases.forEach(function (item) {
                var bInstance = new B(),
                    b = B();

                expect(b.apply(null, item)).to.eql(bInstance.stringify.apply(bInstance, item));
            });
        });
    });

    describe('b_.with()', function () {
        it('returns partially applied b_', function () {

            cases.forEach(function (item) {
                var b = B();

                item.forEach(function (arg, index) {
                    var curriedB = b.with.apply(b, item.slice(0, index));

                    expect(b.apply(null, item)).to.eql(curriedB.apply(null, item.slice(index)));
                });
            });
        });
    });

});
