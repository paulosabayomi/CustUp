/**
 * @jest-environment jsdom
 */

import {describe, expect, test} from '@jest/globals';
import CustUp from "../src/custup.min.js"

document.body.innerHTML = `
    <div id="testdiv"></div>
    <div id="testdiv2"></div>
    <div id="testdiv3"></div>
    <div id="testdiv4"></div>
    <div id="testdiv5"></div>
`;

const init1 = new CustUp({
    targetRootElement: '#testdiv'
})

const init2 = new CustUp({
    targetRootElement: '#testdiv2',
    ui_type: 'resumeUploaderUI'
})

const init3 = new CustUp({
    targetRootElement: '#testdiv3',
    ui_type: 'bare'
})

const init4 = new CustUp({
    targetRootElement: '#testdiv4',
    ui_type: 'detached'
})

const init5 = new CustUp({
    targetRootElement: '#testdiv5',
    ui_type: 'profilePicture',
    instance_attach: [init1, init2]
})

describe('CustUp initialization test', () => {
    describe("General Tests", () => {
        test('CustUp init object to be typeof Object', () => {
            expect(typeof init1).toBe('object')
        });
        test('CustUp initializeUI should return false when called after CustUp has alread been initialized in a container', () => {
            expect(init1.initializeUI()).toBe(false)
        });
        test('CustUp should create a wrapper div element', () => {
            expect(typeof init1._custupEl).toBe('object')
        });
        test('CustUp wrapper div element should be in DOM', () => {
            expect(document.querySelector('#testdiv').querySelector('._custup_parent_container')).not.toBe(null)
        });
        test('CustUp ui styles object to be typeof Object', () => {
            expect(typeof init1.ui_styles).toBe('object')
        });
        test('CustUp ui icons object to be typeof Object', () => {
            expect(typeof init1.ui_icons).toBe('object')
        });
        test('CustUp axios instance should not be undefined', () => {
            expect(typeof init1.__axios_instance).not.toBe(undefined)
        });
    })
    describe("UI type tests", () => {
        test('CustUp resumeUploaderUI ui type should work normally like default', () => {
            expect(typeof init2).toBe('object')
        });
        test('CustUp bareUI ui type should work normally like default', () => {
            expect(typeof init3).toBe('object')
        });
        test('CustUp detachedUI ui type should work normally like default', () => {
            expect(typeof init4).toBe('object')
        });
        test('CustUp profilePicture ui type should work normally like default', () => {
            expect(typeof init5).toBe('object')
        });
    })
    describe("Different instances test", () => {
        test('The CustUp main HTML div container of an instance should be different from another container', () => {
            expect(init1._custupEl == init2._custupEl).toBe(false)
        });
        test('CustUp instance attachment should work', () => {
            expect(Array.isArray(init5.options.instance_attach[0].selectedFiles)).toBe(true)
        });
    })
})

