"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/parse-entities";
exports.ids = ["vendor-chunks/parse-entities"];
exports.modules = {

/***/ "(ssr)/./node_modules/parse-entities/lib/index.js":
/*!**************************************************!*\
  !*** ./node_modules/parse-entities/lib/index.js ***!
  \**************************************************/
/***/ ((__unused_webpack___webpack_module__, __webpack_exports__, __webpack_require__) => {

eval("__webpack_require__.r(__webpack_exports__);\n/* harmony export */ __webpack_require__.d(__webpack_exports__, {\n/* harmony export */   parseEntities: () => (/* binding */ parseEntities)\n/* harmony export */ });\n/* harmony import */ var character_entities_legacy__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! character-entities-legacy */ \"(ssr)/./node_modules/character-entities-legacy/index.js\");\n/* harmony import */ var character_reference_invalid__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! character-reference-invalid */ \"(ssr)/./node_modules/character-reference-invalid/index.js\");\n/* harmony import */ var is_decimal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! is-decimal */ \"(ssr)/./node_modules/is-decimal/index.js\");\n/* harmony import */ var is_hexadecimal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! is-hexadecimal */ \"(ssr)/./node_modules/is-hexadecimal/index.js\");\n/* harmony import */ var is_alphanumerical__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! is-alphanumerical */ \"(ssr)/./node_modules/is-alphanumerical/index.js\");\n/* harmony import */ var decode_named_character_reference__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! decode-named-character-reference */ \"(ssr)/./node_modules/decode-named-character-reference/index.js\");\n/**\n * @typedef {import('unist').Point} Point\n * @typedef {import('unist').Position} Position\n */\n\n\n\n\n\n\n\n\nconst fromCharCode = String.fromCharCode\n\n// Warning messages.\nconst messages = [\n  '',\n  /* 1: Non terminated (named) */\n  'Named character references must be terminated by a semicolon',\n  /* 2: Non terminated (numeric) */\n  'Numeric character references must be terminated by a semicolon',\n  /* 3: Empty (named) */\n  'Named character references cannot be empty',\n  /* 4: Empty (numeric) */\n  'Numeric character references cannot be empty',\n  /* 5: Unknown (named) */\n  'Named character references must be known',\n  /* 6: Disallowed (numeric) */\n  'Numeric character references cannot be disallowed',\n  /* 7: Prohibited (numeric) */\n  'Numeric character references cannot be outside the permissible Unicode range'\n]\n\n/**\n * Parse HTML character references.\n *\n * @param {string} value\n * @param {import('../index.js').Options} [options={}]\n */\nfunction parseEntities(value, options = {}) {\n  const additional =\n    typeof options.additional === 'string'\n      ? options.additional.charCodeAt(0)\n      : options.additional\n  /** @type {Array<string>} */\n  const result = []\n  let index = 0\n  let lines = -1\n  let queue = ''\n  /** @type {Point|undefined} */\n  let point\n  /** @type {Array<number>|undefined} */\n  let indent\n\n  if (options.position) {\n    if ('start' in options.position || 'indent' in options.position) {\n      // @ts-expect-error: points don’t have indent.\n      indent = options.position.indent\n      // @ts-expect-error: points don’t have indent.\n      point = options.position.start\n    } else {\n      point = options.position\n    }\n  }\n\n  let line = (point ? point.line : 0) || 1\n  let column = (point ? point.column : 0) || 1\n\n  // Cache the current point.\n  let previous = now()\n  /** @type {number|undefined} */\n  let character\n\n  // Ensure the algorithm walks over the first character (inclusive).\n  index--\n\n  while (++index <= value.length) {\n    // If the previous character was a newline.\n    if (character === 10 /* `\\n` */) {\n      column = (indent ? indent[lines] : 0) || 1\n    }\n\n    character = value.charCodeAt(index)\n\n    if (character === 38 /* `&` */) {\n      const following = value.charCodeAt(index + 1)\n\n      // The behavior depends on the identity of the next character.\n      if (\n        following === 9 /* `\\t` */ ||\n        following === 10 /* `\\n` */ ||\n        following === 12 /* `\\f` */ ||\n        following === 32 /* ` ` */ ||\n        following === 38 /* `&` */ ||\n        following === 60 /* `<` */ ||\n        Number.isNaN(following) ||\n        (additional && following === additional)\n      ) {\n        // Not a character reference.\n        // No characters are consumed, and nothing is returned.\n        // This is not an error, either.\n        queue += fromCharCode(character)\n        column++\n        continue\n      }\n\n      const start = index + 1\n      let begin = start\n      let end = start\n      /** @type {string} */\n      let type\n\n      if (following === 35 /* `#` */) {\n        // Numerical reference.\n        end = ++begin\n\n        // The behavior further depends on the next character.\n        const following = value.charCodeAt(end)\n\n        if (following === 88 /* `X` */ || following === 120 /* `x` */) {\n          // ASCII hexadecimal digits.\n          type = 'hexadecimal'\n          end = ++begin\n        } else {\n          // ASCII decimal digits.\n          type = 'decimal'\n        }\n      } else {\n        // Named reference.\n        type = 'named'\n      }\n\n      let characterReferenceCharacters = ''\n      let characterReference = ''\n      let characters = ''\n      // Each type of character reference accepts different characters.\n      // This test is used to detect whether a reference has ended (as the semicolon\n      // is not strictly needed).\n      const test =\n        type === 'named'\n          ? is_alphanumerical__WEBPACK_IMPORTED_MODULE_0__.isAlphanumerical\n          : type === 'decimal'\n          ? is_decimal__WEBPACK_IMPORTED_MODULE_1__.isDecimal\n          : is_hexadecimal__WEBPACK_IMPORTED_MODULE_2__.isHexadecimal\n\n      end--\n\n      while (++end <= value.length) {\n        const following = value.charCodeAt(end)\n\n        if (!test(following)) {\n          break\n        }\n\n        characters += fromCharCode(following)\n\n        // Check if we can match a legacy named reference.\n        // If so, we cache that as the last viable named reference.\n        // This ensures we do not need to walk backwards later.\n        if (type === 'named' && character_entities_legacy__WEBPACK_IMPORTED_MODULE_3__.characterEntitiesLegacy.includes(characters)) {\n          characterReferenceCharacters = characters\n          // @ts-expect-error: always able to decode.\n          characterReference = (0,decode_named_character_reference__WEBPACK_IMPORTED_MODULE_4__.decodeNamedCharacterReference)(characters)\n        }\n      }\n\n      let terminated = value.charCodeAt(end) === 59 /* `;` */\n\n      if (terminated) {\n        end++\n\n        const namedReference =\n          type === 'named' ? (0,decode_named_character_reference__WEBPACK_IMPORTED_MODULE_4__.decodeNamedCharacterReference)(characters) : false\n\n        if (namedReference) {\n          characterReferenceCharacters = characters\n          characterReference = namedReference\n        }\n      }\n\n      let diff = 1 + end - start\n      let reference = ''\n\n      if (!terminated && options.nonTerminated === false) {\n        // Empty.\n      } else if (!characters) {\n        // An empty (possible) reference is valid, unless it’s numeric (thus an\n        // ampersand followed by an octothorp).\n        if (type !== 'named') {\n          warning(4 /* Empty (numeric) */, diff)\n        }\n      } else if (type === 'named') {\n        // An ampersand followed by anything unknown, and not terminated, is\n        // invalid.\n        if (terminated && !characterReference) {\n          warning(5 /* Unknown (named) */, 1)\n        } else {\n          // If there’s something after an named reference which is not known,\n          // cap the reference.\n          if (characterReferenceCharacters !== characters) {\n            end = begin + characterReferenceCharacters.length\n            diff = 1 + end - begin\n            terminated = false\n          }\n\n          // If the reference is not terminated, warn.\n          if (!terminated) {\n            const reason = characterReferenceCharacters\n              ? 1 /* Non terminated (named) */\n              : 3 /* Empty (named) */\n\n            if (options.attribute) {\n              const following = value.charCodeAt(end)\n\n              if (following === 61 /* `=` */) {\n                warning(reason, diff)\n                characterReference = ''\n              } else if ((0,is_alphanumerical__WEBPACK_IMPORTED_MODULE_0__.isAlphanumerical)(following)) {\n                characterReference = ''\n              } else {\n                warning(reason, diff)\n              }\n            } else {\n              warning(reason, diff)\n            }\n          }\n        }\n\n        reference = characterReference\n      } else {\n        if (!terminated) {\n          // All nonterminated numeric references are not rendered, and emit a\n          // warning.\n          warning(2 /* Non terminated (numeric) */, diff)\n        }\n\n        // When terminated and numerical, parse as either hexadecimal or\n        // decimal.\n        let referenceCode = Number.parseInt(\n          characters,\n          type === 'hexadecimal' ? 16 : 10\n        )\n\n        // Emit a warning when the parsed number is prohibited, and replace with\n        // replacement character.\n        if (prohibited(referenceCode)) {\n          warning(7 /* Prohibited (numeric) */, diff)\n          reference = fromCharCode(65533 /* `�` */)\n        } else if (referenceCode in character_reference_invalid__WEBPACK_IMPORTED_MODULE_5__.characterReferenceInvalid) {\n          // Emit a warning when the parsed number is disallowed, and replace by\n          // an alternative.\n          warning(6 /* Disallowed (numeric) */, diff)\n          reference = character_reference_invalid__WEBPACK_IMPORTED_MODULE_5__.characterReferenceInvalid[referenceCode]\n        } else {\n          // Parse the number.\n          let output = ''\n\n          // Emit a warning when the parsed number should not be used.\n          if (disallowed(referenceCode)) {\n            warning(6 /* Disallowed (numeric) */, diff)\n          }\n\n          // Serialize the number.\n          if (referenceCode > 0xffff) {\n            referenceCode -= 0x10000\n            output += fromCharCode((referenceCode >>> (10 & 0x3ff)) | 0xd800)\n            referenceCode = 0xdc00 | (referenceCode & 0x3ff)\n          }\n\n          reference = output + fromCharCode(referenceCode)\n        }\n      }\n\n      // Found it!\n      // First eat the queued characters as normal text, then eat a reference.\n      if (reference) {\n        flush()\n\n        previous = now()\n        index = end - 1\n        column += end - start + 1\n        result.push(reference)\n        const next = now()\n        next.offset++\n\n        if (options.reference) {\n          options.reference.call(\n            options.referenceContext,\n            reference,\n            {start: previous, end: next},\n            value.slice(start - 1, end)\n          )\n        }\n\n        previous = next\n      } else {\n        // If we could not find a reference, queue the checked characters (as\n        // normal characters), and move the pointer to their end.\n        // This is possible because we can be certain neither newlines nor\n        // ampersands are included.\n        characters = value.slice(start - 1, end)\n        queue += characters\n        column += characters.length\n        index = end - 1\n      }\n    } else {\n      // Handle anything other than an ampersand, including newlines and EOF.\n      if (character === 10 /* `\\n` */) {\n        line++\n        lines++\n        column = 0\n      }\n\n      if (Number.isNaN(character)) {\n        flush()\n      } else {\n        queue += fromCharCode(character)\n        column++\n      }\n    }\n  }\n\n  // Return the reduced nodes.\n  return result.join('')\n\n  // Get current position.\n  function now() {\n    return {\n      line,\n      column,\n      offset: index + ((point ? point.offset : 0) || 0)\n    }\n  }\n\n  /**\n   * Handle the warning.\n   *\n   * @param {1|2|3|4|5|6|7} code\n   * @param {number} offset\n   */\n  function warning(code, offset) {\n    /** @type {ReturnType<now>} */\n    let position\n\n    if (options.warning) {\n      position = now()\n      position.column += offset\n      position.offset += offset\n\n      options.warning.call(\n        options.warningContext,\n        messages[code],\n        position,\n        code\n      )\n    }\n  }\n\n  /**\n   * Flush `queue` (normal text).\n   * Macro invoked before each reference and at the end of `value`.\n   * Does nothing when `queue` is empty.\n   */\n  function flush() {\n    if (queue) {\n      result.push(queue)\n\n      if (options.text) {\n        options.text.call(options.textContext, queue, {\n          start: previous,\n          end: now()\n        })\n      }\n\n      queue = ''\n    }\n  }\n}\n\n/**\n * Check if `character` is outside the permissible unicode range.\n *\n * @param {number} code\n * @returns {boolean}\n */\nfunction prohibited(code) {\n  return (code >= 0xd800 && code <= 0xdfff) || code > 0x10ffff\n}\n\n/**\n * Check if `character` is disallowed.\n *\n * @param {number} code\n * @returns {boolean}\n */\nfunction disallowed(code) {\n  return (\n    (code >= 0x0001 && code <= 0x0008) ||\n    code === 0x000b ||\n    (code >= 0x000d && code <= 0x001f) ||\n    (code >= 0x007f && code <= 0x009f) ||\n    (code >= 0xfdd0 && code <= 0xfdef) ||\n    (code & 0xffff) === 0xffff ||\n    (code & 0xffff) === 0xfffe\n  )\n}\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvcGFyc2UtZW50aXRpZXMvbGliL2luZGV4LmpzIiwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFBQTtBQUNBLGFBQWEsdUJBQXVCO0FBQ3BDLGFBQWEsMEJBQTBCO0FBQ3ZDOztBQUVpRTtBQUNJO0FBQ2pDO0FBQ1E7QUFDTTtBQUM0Qjs7QUFFOUU7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixXQUFXLCtCQUErQixXQUFXO0FBQ3JEO0FBQ08sMENBQTBDO0FBQ2pEO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxlQUFlO0FBQzVCO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsYUFBYSxpQkFBaUI7QUFDOUI7QUFDQSxhQUFhLHlCQUF5QjtBQUN0Qzs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBOztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBLGFBQWEsa0JBQWtCO0FBQy9COztBQUVBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQSxpQkFBaUIsUUFBUTtBQUN6Qjs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLFVBQVU7QUFDVjtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxZQUFZLCtEQUFnQjtBQUM1QjtBQUNBLFlBQVksaURBQVM7QUFDckIsWUFBWSx5REFBYTs7QUFFekI7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7O0FBRUE7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsZ0NBQWdDLDhFQUF1QjtBQUN2RDtBQUNBO0FBQ0EsK0JBQStCLCtGQUE2QjtBQUM1RDtBQUNBOztBQUVBLHlEQUF5RDs7QUFFekQ7QUFDQTs7QUFFQTtBQUNBLDZCQUE2QiwrRkFBNkI7O0FBRTFEO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTs7QUFFQTtBQUNBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVO0FBQ1Y7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLGdCQUFnQixTQUFTLG1FQUFnQjtBQUN6QztBQUNBLGdCQUFnQjtBQUNoQjtBQUNBO0FBQ0EsY0FBYztBQUNkO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0EsUUFBUTtBQUNSO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxVQUFVLDBCQUEwQixrRkFBeUI7QUFDN0Q7QUFDQTtBQUNBO0FBQ0Esc0JBQXNCLGtGQUF5QjtBQUMvQyxVQUFVO0FBQ1Y7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBLGFBQWEsMkJBQTJCO0FBQ3hDO0FBQ0E7QUFDQTs7QUFFQTtBQUNBLFFBQVE7QUFDUjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQSxNQUFNO0FBQ047QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQSxRQUFRO0FBQ1I7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsYUFBYSxlQUFlO0FBQzVCLGFBQWEsUUFBUTtBQUNyQjtBQUNBO0FBQ0EsZUFBZSxpQkFBaUI7QUFDaEM7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTs7QUFFQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EsU0FBUztBQUNUOztBQUVBO0FBQ0E7QUFDQTtBQUNBOztBQUVBO0FBQ0E7QUFDQTtBQUNBLFdBQVcsUUFBUTtBQUNuQixhQUFhO0FBQ2I7QUFDQTtBQUNBO0FBQ0E7O0FBRUE7QUFDQTtBQUNBO0FBQ0EsV0FBVyxRQUFRO0FBQ25CLGFBQWE7QUFDYjtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0E7QUFDQTtBQUNBO0FBQ0EiLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9qaXJhLWNsb25lLy4vbm9kZV9tb2R1bGVzL3BhcnNlLWVudGl0aWVzL2xpYi9pbmRleC5qcz9hMGY0Il0sInNvdXJjZXNDb250ZW50IjpbIi8qKlxuICogQHR5cGVkZWYge2ltcG9ydCgndW5pc3QnKS5Qb2ludH0gUG9pbnRcbiAqIEB0eXBlZGVmIHtpbXBvcnQoJ3VuaXN0JykuUG9zaXRpb259IFBvc2l0aW9uXG4gKi9cblxuaW1wb3J0IHtjaGFyYWN0ZXJFbnRpdGllc0xlZ2FjeX0gZnJvbSAnY2hhcmFjdGVyLWVudGl0aWVzLWxlZ2FjeSdcbmltcG9ydCB7Y2hhcmFjdGVyUmVmZXJlbmNlSW52YWxpZH0gZnJvbSAnY2hhcmFjdGVyLXJlZmVyZW5jZS1pbnZhbGlkJ1xuaW1wb3J0IHtpc0RlY2ltYWx9IGZyb20gJ2lzLWRlY2ltYWwnXG5pbXBvcnQge2lzSGV4YWRlY2ltYWx9IGZyb20gJ2lzLWhleGFkZWNpbWFsJ1xuaW1wb3J0IHtpc0FscGhhbnVtZXJpY2FsfSBmcm9tICdpcy1hbHBoYW51bWVyaWNhbCdcbmltcG9ydCB7ZGVjb2RlTmFtZWRDaGFyYWN0ZXJSZWZlcmVuY2V9IGZyb20gJ2RlY29kZS1uYW1lZC1jaGFyYWN0ZXItcmVmZXJlbmNlJ1xuXG5jb25zdCBmcm9tQ2hhckNvZGUgPSBTdHJpbmcuZnJvbUNoYXJDb2RlXG5cbi8vIFdhcm5pbmcgbWVzc2FnZXMuXG5jb25zdCBtZXNzYWdlcyA9IFtcbiAgJycsXG4gIC8qIDE6IE5vbiB0ZXJtaW5hdGVkIChuYW1lZCkgKi9cbiAgJ05hbWVkIGNoYXJhY3RlciByZWZlcmVuY2VzIG11c3QgYmUgdGVybWluYXRlZCBieSBhIHNlbWljb2xvbicsXG4gIC8qIDI6IE5vbiB0ZXJtaW5hdGVkIChudW1lcmljKSAqL1xuICAnTnVtZXJpYyBjaGFyYWN0ZXIgcmVmZXJlbmNlcyBtdXN0IGJlIHRlcm1pbmF0ZWQgYnkgYSBzZW1pY29sb24nLFxuICAvKiAzOiBFbXB0eSAobmFtZWQpICovXG4gICdOYW1lZCBjaGFyYWN0ZXIgcmVmZXJlbmNlcyBjYW5ub3QgYmUgZW1wdHknLFxuICAvKiA0OiBFbXB0eSAobnVtZXJpYykgKi9cbiAgJ051bWVyaWMgY2hhcmFjdGVyIHJlZmVyZW5jZXMgY2Fubm90IGJlIGVtcHR5JyxcbiAgLyogNTogVW5rbm93biAobmFtZWQpICovXG4gICdOYW1lZCBjaGFyYWN0ZXIgcmVmZXJlbmNlcyBtdXN0IGJlIGtub3duJyxcbiAgLyogNjogRGlzYWxsb3dlZCAobnVtZXJpYykgKi9cbiAgJ051bWVyaWMgY2hhcmFjdGVyIHJlZmVyZW5jZXMgY2Fubm90IGJlIGRpc2FsbG93ZWQnLFxuICAvKiA3OiBQcm9oaWJpdGVkIChudW1lcmljKSAqL1xuICAnTnVtZXJpYyBjaGFyYWN0ZXIgcmVmZXJlbmNlcyBjYW5ub3QgYmUgb3V0c2lkZSB0aGUgcGVybWlzc2libGUgVW5pY29kZSByYW5nZSdcbl1cblxuLyoqXG4gKiBQYXJzZSBIVE1MIGNoYXJhY3RlciByZWZlcmVuY2VzLlxuICpcbiAqIEBwYXJhbSB7c3RyaW5nfSB2YWx1ZVxuICogQHBhcmFtIHtpbXBvcnQoJy4uL2luZGV4LmpzJykuT3B0aW9uc30gW29wdGlvbnM9e31dXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBwYXJzZUVudGl0aWVzKHZhbHVlLCBvcHRpb25zID0ge30pIHtcbiAgY29uc3QgYWRkaXRpb25hbCA9XG4gICAgdHlwZW9mIG9wdGlvbnMuYWRkaXRpb25hbCA9PT0gJ3N0cmluZydcbiAgICAgID8gb3B0aW9ucy5hZGRpdGlvbmFsLmNoYXJDb2RlQXQoMClcbiAgICAgIDogb3B0aW9ucy5hZGRpdGlvbmFsXG4gIC8qKiBAdHlwZSB7QXJyYXk8c3RyaW5nPn0gKi9cbiAgY29uc3QgcmVzdWx0ID0gW11cbiAgbGV0IGluZGV4ID0gMFxuICBsZXQgbGluZXMgPSAtMVxuICBsZXQgcXVldWUgPSAnJ1xuICAvKiogQHR5cGUge1BvaW50fHVuZGVmaW5lZH0gKi9cbiAgbGV0IHBvaW50XG4gIC8qKiBAdHlwZSB7QXJyYXk8bnVtYmVyPnx1bmRlZmluZWR9ICovXG4gIGxldCBpbmRlbnRcblxuICBpZiAob3B0aW9ucy5wb3NpdGlvbikge1xuICAgIGlmICgnc3RhcnQnIGluIG9wdGlvbnMucG9zaXRpb24gfHwgJ2luZGVudCcgaW4gb3B0aW9ucy5wb3NpdGlvbikge1xuICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvcjogcG9pbnRzIGRvbuKAmXQgaGF2ZSBpbmRlbnQuXG4gICAgICBpbmRlbnQgPSBvcHRpb25zLnBvc2l0aW9uLmluZGVudFxuICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvcjogcG9pbnRzIGRvbuKAmXQgaGF2ZSBpbmRlbnQuXG4gICAgICBwb2ludCA9IG9wdGlvbnMucG9zaXRpb24uc3RhcnRcbiAgICB9IGVsc2Uge1xuICAgICAgcG9pbnQgPSBvcHRpb25zLnBvc2l0aW9uXG4gICAgfVxuICB9XG5cbiAgbGV0IGxpbmUgPSAocG9pbnQgPyBwb2ludC5saW5lIDogMCkgfHwgMVxuICBsZXQgY29sdW1uID0gKHBvaW50ID8gcG9pbnQuY29sdW1uIDogMCkgfHwgMVxuXG4gIC8vIENhY2hlIHRoZSBjdXJyZW50IHBvaW50LlxuICBsZXQgcHJldmlvdXMgPSBub3coKVxuICAvKiogQHR5cGUge251bWJlcnx1bmRlZmluZWR9ICovXG4gIGxldCBjaGFyYWN0ZXJcblxuICAvLyBFbnN1cmUgdGhlIGFsZ29yaXRobSB3YWxrcyBvdmVyIHRoZSBmaXJzdCBjaGFyYWN0ZXIgKGluY2x1c2l2ZSkuXG4gIGluZGV4LS1cblxuICB3aGlsZSAoKytpbmRleCA8PSB2YWx1ZS5sZW5ndGgpIHtcbiAgICAvLyBJZiB0aGUgcHJldmlvdXMgY2hhcmFjdGVyIHdhcyBhIG5ld2xpbmUuXG4gICAgaWYgKGNoYXJhY3RlciA9PT0gMTAgLyogYFxcbmAgKi8pIHtcbiAgICAgIGNvbHVtbiA9IChpbmRlbnQgPyBpbmRlbnRbbGluZXNdIDogMCkgfHwgMVxuICAgIH1cblxuICAgIGNoYXJhY3RlciA9IHZhbHVlLmNoYXJDb2RlQXQoaW5kZXgpXG5cbiAgICBpZiAoY2hhcmFjdGVyID09PSAzOCAvKiBgJmAgKi8pIHtcbiAgICAgIGNvbnN0IGZvbGxvd2luZyA9IHZhbHVlLmNoYXJDb2RlQXQoaW5kZXggKyAxKVxuXG4gICAgICAvLyBUaGUgYmVoYXZpb3IgZGVwZW5kcyBvbiB0aGUgaWRlbnRpdHkgb2YgdGhlIG5leHQgY2hhcmFjdGVyLlxuICAgICAgaWYgKFxuICAgICAgICBmb2xsb3dpbmcgPT09IDkgLyogYFxcdGAgKi8gfHxcbiAgICAgICAgZm9sbG93aW5nID09PSAxMCAvKiBgXFxuYCAqLyB8fFxuICAgICAgICBmb2xsb3dpbmcgPT09IDEyIC8qIGBcXGZgICovIHx8XG4gICAgICAgIGZvbGxvd2luZyA9PT0gMzIgLyogYCBgICovIHx8XG4gICAgICAgIGZvbGxvd2luZyA9PT0gMzggLyogYCZgICovIHx8XG4gICAgICAgIGZvbGxvd2luZyA9PT0gNjAgLyogYDxgICovIHx8XG4gICAgICAgIE51bWJlci5pc05hTihmb2xsb3dpbmcpIHx8XG4gICAgICAgIChhZGRpdGlvbmFsICYmIGZvbGxvd2luZyA9PT0gYWRkaXRpb25hbClcbiAgICAgICkge1xuICAgICAgICAvLyBOb3QgYSBjaGFyYWN0ZXIgcmVmZXJlbmNlLlxuICAgICAgICAvLyBObyBjaGFyYWN0ZXJzIGFyZSBjb25zdW1lZCwgYW5kIG5vdGhpbmcgaXMgcmV0dXJuZWQuXG4gICAgICAgIC8vIFRoaXMgaXMgbm90IGFuIGVycm9yLCBlaXRoZXIuXG4gICAgICAgIHF1ZXVlICs9IGZyb21DaGFyQ29kZShjaGFyYWN0ZXIpXG4gICAgICAgIGNvbHVtbisrXG4gICAgICAgIGNvbnRpbnVlXG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHN0YXJ0ID0gaW5kZXggKyAxXG4gICAgICBsZXQgYmVnaW4gPSBzdGFydFxuICAgICAgbGV0IGVuZCA9IHN0YXJ0XG4gICAgICAvKiogQHR5cGUge3N0cmluZ30gKi9cbiAgICAgIGxldCB0eXBlXG5cbiAgICAgIGlmIChmb2xsb3dpbmcgPT09IDM1IC8qIGAjYCAqLykge1xuICAgICAgICAvLyBOdW1lcmljYWwgcmVmZXJlbmNlLlxuICAgICAgICBlbmQgPSArK2JlZ2luXG5cbiAgICAgICAgLy8gVGhlIGJlaGF2aW9yIGZ1cnRoZXIgZGVwZW5kcyBvbiB0aGUgbmV4dCBjaGFyYWN0ZXIuXG4gICAgICAgIGNvbnN0IGZvbGxvd2luZyA9IHZhbHVlLmNoYXJDb2RlQXQoZW5kKVxuXG4gICAgICAgIGlmIChmb2xsb3dpbmcgPT09IDg4IC8qIGBYYCAqLyB8fCBmb2xsb3dpbmcgPT09IDEyMCAvKiBgeGAgKi8pIHtcbiAgICAgICAgICAvLyBBU0NJSSBoZXhhZGVjaW1hbCBkaWdpdHMuXG4gICAgICAgICAgdHlwZSA9ICdoZXhhZGVjaW1hbCdcbiAgICAgICAgICBlbmQgPSArK2JlZ2luXG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgLy8gQVNDSUkgZGVjaW1hbCBkaWdpdHMuXG4gICAgICAgICAgdHlwZSA9ICdkZWNpbWFsJ1xuICAgICAgICB9XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBOYW1lZCByZWZlcmVuY2UuXG4gICAgICAgIHR5cGUgPSAnbmFtZWQnXG4gICAgICB9XG5cbiAgICAgIGxldCBjaGFyYWN0ZXJSZWZlcmVuY2VDaGFyYWN0ZXJzID0gJydcbiAgICAgIGxldCBjaGFyYWN0ZXJSZWZlcmVuY2UgPSAnJ1xuICAgICAgbGV0IGNoYXJhY3RlcnMgPSAnJ1xuICAgICAgLy8gRWFjaCB0eXBlIG9mIGNoYXJhY3RlciByZWZlcmVuY2UgYWNjZXB0cyBkaWZmZXJlbnQgY2hhcmFjdGVycy5cbiAgICAgIC8vIFRoaXMgdGVzdCBpcyB1c2VkIHRvIGRldGVjdCB3aGV0aGVyIGEgcmVmZXJlbmNlIGhhcyBlbmRlZCAoYXMgdGhlIHNlbWljb2xvblxuICAgICAgLy8gaXMgbm90IHN0cmljdGx5IG5lZWRlZCkuXG4gICAgICBjb25zdCB0ZXN0ID1cbiAgICAgICAgdHlwZSA9PT0gJ25hbWVkJ1xuICAgICAgICAgID8gaXNBbHBoYW51bWVyaWNhbFxuICAgICAgICAgIDogdHlwZSA9PT0gJ2RlY2ltYWwnXG4gICAgICAgICAgPyBpc0RlY2ltYWxcbiAgICAgICAgICA6IGlzSGV4YWRlY2ltYWxcblxuICAgICAgZW5kLS1cblxuICAgICAgd2hpbGUgKCsrZW5kIDw9IHZhbHVlLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBmb2xsb3dpbmcgPSB2YWx1ZS5jaGFyQ29kZUF0KGVuZClcblxuICAgICAgICBpZiAoIXRlc3QoZm9sbG93aW5nKSkge1xuICAgICAgICAgIGJyZWFrXG4gICAgICAgIH1cblxuICAgICAgICBjaGFyYWN0ZXJzICs9IGZyb21DaGFyQ29kZShmb2xsb3dpbmcpXG5cbiAgICAgICAgLy8gQ2hlY2sgaWYgd2UgY2FuIG1hdGNoIGEgbGVnYWN5IG5hbWVkIHJlZmVyZW5jZS5cbiAgICAgICAgLy8gSWYgc28sIHdlIGNhY2hlIHRoYXQgYXMgdGhlIGxhc3QgdmlhYmxlIG5hbWVkIHJlZmVyZW5jZS5cbiAgICAgICAgLy8gVGhpcyBlbnN1cmVzIHdlIGRvIG5vdCBuZWVkIHRvIHdhbGsgYmFja3dhcmRzIGxhdGVyLlxuICAgICAgICBpZiAodHlwZSA9PT0gJ25hbWVkJyAmJiBjaGFyYWN0ZXJFbnRpdGllc0xlZ2FjeS5pbmNsdWRlcyhjaGFyYWN0ZXJzKSkge1xuICAgICAgICAgIGNoYXJhY3RlclJlZmVyZW5jZUNoYXJhY3RlcnMgPSBjaGFyYWN0ZXJzXG4gICAgICAgICAgLy8gQHRzLWV4cGVjdC1lcnJvcjogYWx3YXlzIGFibGUgdG8gZGVjb2RlLlxuICAgICAgICAgIGNoYXJhY3RlclJlZmVyZW5jZSA9IGRlY29kZU5hbWVkQ2hhcmFjdGVyUmVmZXJlbmNlKGNoYXJhY3RlcnMpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgbGV0IHRlcm1pbmF0ZWQgPSB2YWx1ZS5jaGFyQ29kZUF0KGVuZCkgPT09IDU5IC8qIGA7YCAqL1xuXG4gICAgICBpZiAodGVybWluYXRlZCkge1xuICAgICAgICBlbmQrK1xuXG4gICAgICAgIGNvbnN0IG5hbWVkUmVmZXJlbmNlID1cbiAgICAgICAgICB0eXBlID09PSAnbmFtZWQnID8gZGVjb2RlTmFtZWRDaGFyYWN0ZXJSZWZlcmVuY2UoY2hhcmFjdGVycykgOiBmYWxzZVxuXG4gICAgICAgIGlmIChuYW1lZFJlZmVyZW5jZSkge1xuICAgICAgICAgIGNoYXJhY3RlclJlZmVyZW5jZUNoYXJhY3RlcnMgPSBjaGFyYWN0ZXJzXG4gICAgICAgICAgY2hhcmFjdGVyUmVmZXJlbmNlID0gbmFtZWRSZWZlcmVuY2VcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBsZXQgZGlmZiA9IDEgKyBlbmQgLSBzdGFydFxuICAgICAgbGV0IHJlZmVyZW5jZSA9ICcnXG5cbiAgICAgIGlmICghdGVybWluYXRlZCAmJiBvcHRpb25zLm5vblRlcm1pbmF0ZWQgPT09IGZhbHNlKSB7XG4gICAgICAgIC8vIEVtcHR5LlxuICAgICAgfSBlbHNlIGlmICghY2hhcmFjdGVycykge1xuICAgICAgICAvLyBBbiBlbXB0eSAocG9zc2libGUpIHJlZmVyZW5jZSBpcyB2YWxpZCwgdW5sZXNzIGl04oCZcyBudW1lcmljICh0aHVzIGFuXG4gICAgICAgIC8vIGFtcGVyc2FuZCBmb2xsb3dlZCBieSBhbiBvY3RvdGhvcnApLlxuICAgICAgICBpZiAodHlwZSAhPT0gJ25hbWVkJykge1xuICAgICAgICAgIHdhcm5pbmcoNCAvKiBFbXB0eSAobnVtZXJpYykgKi8sIGRpZmYpXG4gICAgICAgIH1cbiAgICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ25hbWVkJykge1xuICAgICAgICAvLyBBbiBhbXBlcnNhbmQgZm9sbG93ZWQgYnkgYW55dGhpbmcgdW5rbm93biwgYW5kIG5vdCB0ZXJtaW5hdGVkLCBpc1xuICAgICAgICAvLyBpbnZhbGlkLlxuICAgICAgICBpZiAodGVybWluYXRlZCAmJiAhY2hhcmFjdGVyUmVmZXJlbmNlKSB7XG4gICAgICAgICAgd2FybmluZyg1IC8qIFVua25vd24gKG5hbWVkKSAqLywgMSlcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBJZiB0aGVyZeKAmXMgc29tZXRoaW5nIGFmdGVyIGFuIG5hbWVkIHJlZmVyZW5jZSB3aGljaCBpcyBub3Qga25vd24sXG4gICAgICAgICAgLy8gY2FwIHRoZSByZWZlcmVuY2UuXG4gICAgICAgICAgaWYgKGNoYXJhY3RlclJlZmVyZW5jZUNoYXJhY3RlcnMgIT09IGNoYXJhY3RlcnMpIHtcbiAgICAgICAgICAgIGVuZCA9IGJlZ2luICsgY2hhcmFjdGVyUmVmZXJlbmNlQ2hhcmFjdGVycy5sZW5ndGhcbiAgICAgICAgICAgIGRpZmYgPSAxICsgZW5kIC0gYmVnaW5cbiAgICAgICAgICAgIHRlcm1pbmF0ZWQgPSBmYWxzZVxuICAgICAgICAgIH1cblxuICAgICAgICAgIC8vIElmIHRoZSByZWZlcmVuY2UgaXMgbm90IHRlcm1pbmF0ZWQsIHdhcm4uXG4gICAgICAgICAgaWYgKCF0ZXJtaW5hdGVkKSB7XG4gICAgICAgICAgICBjb25zdCByZWFzb24gPSBjaGFyYWN0ZXJSZWZlcmVuY2VDaGFyYWN0ZXJzXG4gICAgICAgICAgICAgID8gMSAvKiBOb24gdGVybWluYXRlZCAobmFtZWQpICovXG4gICAgICAgICAgICAgIDogMyAvKiBFbXB0eSAobmFtZWQpICovXG5cbiAgICAgICAgICAgIGlmIChvcHRpb25zLmF0dHJpYnV0ZSkge1xuICAgICAgICAgICAgICBjb25zdCBmb2xsb3dpbmcgPSB2YWx1ZS5jaGFyQ29kZUF0KGVuZClcblxuICAgICAgICAgICAgICBpZiAoZm9sbG93aW5nID09PSA2MSAvKiBgPWAgKi8pIHtcbiAgICAgICAgICAgICAgICB3YXJuaW5nKHJlYXNvbiwgZGlmZilcbiAgICAgICAgICAgICAgICBjaGFyYWN0ZXJSZWZlcmVuY2UgPSAnJ1xuICAgICAgICAgICAgICB9IGVsc2UgaWYgKGlzQWxwaGFudW1lcmljYWwoZm9sbG93aW5nKSkge1xuICAgICAgICAgICAgICAgIGNoYXJhY3RlclJlZmVyZW5jZSA9ICcnXG4gICAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgd2FybmluZyhyZWFzb24sIGRpZmYpXG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgIHdhcm5pbmcocmVhc29uLCBkaWZmKVxuICAgICAgICAgICAgfVxuICAgICAgICAgIH1cbiAgICAgICAgfVxuXG4gICAgICAgIHJlZmVyZW5jZSA9IGNoYXJhY3RlclJlZmVyZW5jZVxuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCF0ZXJtaW5hdGVkKSB7XG4gICAgICAgICAgLy8gQWxsIG5vbnRlcm1pbmF0ZWQgbnVtZXJpYyByZWZlcmVuY2VzIGFyZSBub3QgcmVuZGVyZWQsIGFuZCBlbWl0IGFcbiAgICAgICAgICAvLyB3YXJuaW5nLlxuICAgICAgICAgIHdhcm5pbmcoMiAvKiBOb24gdGVybWluYXRlZCAobnVtZXJpYykgKi8sIGRpZmYpXG4gICAgICAgIH1cblxuICAgICAgICAvLyBXaGVuIHRlcm1pbmF0ZWQgYW5kIG51bWVyaWNhbCwgcGFyc2UgYXMgZWl0aGVyIGhleGFkZWNpbWFsIG9yXG4gICAgICAgIC8vIGRlY2ltYWwuXG4gICAgICAgIGxldCByZWZlcmVuY2VDb2RlID0gTnVtYmVyLnBhcnNlSW50KFxuICAgICAgICAgIGNoYXJhY3RlcnMsXG4gICAgICAgICAgdHlwZSA9PT0gJ2hleGFkZWNpbWFsJyA/IDE2IDogMTBcbiAgICAgICAgKVxuXG4gICAgICAgIC8vIEVtaXQgYSB3YXJuaW5nIHdoZW4gdGhlIHBhcnNlZCBudW1iZXIgaXMgcHJvaGliaXRlZCwgYW5kIHJlcGxhY2Ugd2l0aFxuICAgICAgICAvLyByZXBsYWNlbWVudCBjaGFyYWN0ZXIuXG4gICAgICAgIGlmIChwcm9oaWJpdGVkKHJlZmVyZW5jZUNvZGUpKSB7XG4gICAgICAgICAgd2FybmluZyg3IC8qIFByb2hpYml0ZWQgKG51bWVyaWMpICovLCBkaWZmKVxuICAgICAgICAgIHJlZmVyZW5jZSA9IGZyb21DaGFyQ29kZSg2NTUzMyAvKiBg77+9YCAqLylcbiAgICAgICAgfSBlbHNlIGlmIChyZWZlcmVuY2VDb2RlIGluIGNoYXJhY3RlclJlZmVyZW5jZUludmFsaWQpIHtcbiAgICAgICAgICAvLyBFbWl0IGEgd2FybmluZyB3aGVuIHRoZSBwYXJzZWQgbnVtYmVyIGlzIGRpc2FsbG93ZWQsIGFuZCByZXBsYWNlIGJ5XG4gICAgICAgICAgLy8gYW4gYWx0ZXJuYXRpdmUuXG4gICAgICAgICAgd2FybmluZyg2IC8qIERpc2FsbG93ZWQgKG51bWVyaWMpICovLCBkaWZmKVxuICAgICAgICAgIHJlZmVyZW5jZSA9IGNoYXJhY3RlclJlZmVyZW5jZUludmFsaWRbcmVmZXJlbmNlQ29kZV1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAvLyBQYXJzZSB0aGUgbnVtYmVyLlxuICAgICAgICAgIGxldCBvdXRwdXQgPSAnJ1xuXG4gICAgICAgICAgLy8gRW1pdCBhIHdhcm5pbmcgd2hlbiB0aGUgcGFyc2VkIG51bWJlciBzaG91bGQgbm90IGJlIHVzZWQuXG4gICAgICAgICAgaWYgKGRpc2FsbG93ZWQocmVmZXJlbmNlQ29kZSkpIHtcbiAgICAgICAgICAgIHdhcm5pbmcoNiAvKiBEaXNhbGxvd2VkIChudW1lcmljKSAqLywgZGlmZilcbiAgICAgICAgICB9XG5cbiAgICAgICAgICAvLyBTZXJpYWxpemUgdGhlIG51bWJlci5cbiAgICAgICAgICBpZiAocmVmZXJlbmNlQ29kZSA+IDB4ZmZmZikge1xuICAgICAgICAgICAgcmVmZXJlbmNlQ29kZSAtPSAweDEwMDAwXG4gICAgICAgICAgICBvdXRwdXQgKz0gZnJvbUNoYXJDb2RlKChyZWZlcmVuY2VDb2RlID4+PiAoMTAgJiAweDNmZikpIHwgMHhkODAwKVxuICAgICAgICAgICAgcmVmZXJlbmNlQ29kZSA9IDB4ZGMwMCB8IChyZWZlcmVuY2VDb2RlICYgMHgzZmYpXG4gICAgICAgICAgfVxuXG4gICAgICAgICAgcmVmZXJlbmNlID0gb3V0cHV0ICsgZnJvbUNoYXJDb2RlKHJlZmVyZW5jZUNvZGUpXG4gICAgICAgIH1cbiAgICAgIH1cblxuICAgICAgLy8gRm91bmQgaXQhXG4gICAgICAvLyBGaXJzdCBlYXQgdGhlIHF1ZXVlZCBjaGFyYWN0ZXJzIGFzIG5vcm1hbCB0ZXh0LCB0aGVuIGVhdCBhIHJlZmVyZW5jZS5cbiAgICAgIGlmIChyZWZlcmVuY2UpIHtcbiAgICAgICAgZmx1c2goKVxuXG4gICAgICAgIHByZXZpb3VzID0gbm93KClcbiAgICAgICAgaW5kZXggPSBlbmQgLSAxXG4gICAgICAgIGNvbHVtbiArPSBlbmQgLSBzdGFydCArIDFcbiAgICAgICAgcmVzdWx0LnB1c2gocmVmZXJlbmNlKVxuICAgICAgICBjb25zdCBuZXh0ID0gbm93KClcbiAgICAgICAgbmV4dC5vZmZzZXQrK1xuXG4gICAgICAgIGlmIChvcHRpb25zLnJlZmVyZW5jZSkge1xuICAgICAgICAgIG9wdGlvbnMucmVmZXJlbmNlLmNhbGwoXG4gICAgICAgICAgICBvcHRpb25zLnJlZmVyZW5jZUNvbnRleHQsXG4gICAgICAgICAgICByZWZlcmVuY2UsXG4gICAgICAgICAgICB7c3RhcnQ6IHByZXZpb3VzLCBlbmQ6IG5leHR9LFxuICAgICAgICAgICAgdmFsdWUuc2xpY2Uoc3RhcnQgLSAxLCBlbmQpXG4gICAgICAgICAgKVxuICAgICAgICB9XG5cbiAgICAgICAgcHJldmlvdXMgPSBuZXh0XG4gICAgICB9IGVsc2Uge1xuICAgICAgICAvLyBJZiB3ZSBjb3VsZCBub3QgZmluZCBhIHJlZmVyZW5jZSwgcXVldWUgdGhlIGNoZWNrZWQgY2hhcmFjdGVycyAoYXNcbiAgICAgICAgLy8gbm9ybWFsIGNoYXJhY3RlcnMpLCBhbmQgbW92ZSB0aGUgcG9pbnRlciB0byB0aGVpciBlbmQuXG4gICAgICAgIC8vIFRoaXMgaXMgcG9zc2libGUgYmVjYXVzZSB3ZSBjYW4gYmUgY2VydGFpbiBuZWl0aGVyIG5ld2xpbmVzIG5vclxuICAgICAgICAvLyBhbXBlcnNhbmRzIGFyZSBpbmNsdWRlZC5cbiAgICAgICAgY2hhcmFjdGVycyA9IHZhbHVlLnNsaWNlKHN0YXJ0IC0gMSwgZW5kKVxuICAgICAgICBxdWV1ZSArPSBjaGFyYWN0ZXJzXG4gICAgICAgIGNvbHVtbiArPSBjaGFyYWN0ZXJzLmxlbmd0aFxuICAgICAgICBpbmRleCA9IGVuZCAtIDFcbiAgICAgIH1cbiAgICB9IGVsc2Uge1xuICAgICAgLy8gSGFuZGxlIGFueXRoaW5nIG90aGVyIHRoYW4gYW4gYW1wZXJzYW5kLCBpbmNsdWRpbmcgbmV3bGluZXMgYW5kIEVPRi5cbiAgICAgIGlmIChjaGFyYWN0ZXIgPT09IDEwIC8qIGBcXG5gICovKSB7XG4gICAgICAgIGxpbmUrK1xuICAgICAgICBsaW5lcysrXG4gICAgICAgIGNvbHVtbiA9IDBcbiAgICAgIH1cblxuICAgICAgaWYgKE51bWJlci5pc05hTihjaGFyYWN0ZXIpKSB7XG4gICAgICAgIGZsdXNoKClcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIHF1ZXVlICs9IGZyb21DaGFyQ29kZShjaGFyYWN0ZXIpXG4gICAgICAgIGNvbHVtbisrXG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgLy8gUmV0dXJuIHRoZSByZWR1Y2VkIG5vZGVzLlxuICByZXR1cm4gcmVzdWx0LmpvaW4oJycpXG5cbiAgLy8gR2V0IGN1cnJlbnQgcG9zaXRpb24uXG4gIGZ1bmN0aW9uIG5vdygpIHtcbiAgICByZXR1cm4ge1xuICAgICAgbGluZSxcbiAgICAgIGNvbHVtbixcbiAgICAgIG9mZnNldDogaW5kZXggKyAoKHBvaW50ID8gcG9pbnQub2Zmc2V0IDogMCkgfHwgMClcbiAgICB9XG4gIH1cblxuICAvKipcbiAgICogSGFuZGxlIHRoZSB3YXJuaW5nLlxuICAgKlxuICAgKiBAcGFyYW0gezF8MnwzfDR8NXw2fDd9IGNvZGVcbiAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldFxuICAgKi9cbiAgZnVuY3Rpb24gd2FybmluZyhjb2RlLCBvZmZzZXQpIHtcbiAgICAvKiogQHR5cGUge1JldHVyblR5cGU8bm93Pn0gKi9cbiAgICBsZXQgcG9zaXRpb25cblxuICAgIGlmIChvcHRpb25zLndhcm5pbmcpIHtcbiAgICAgIHBvc2l0aW9uID0gbm93KClcbiAgICAgIHBvc2l0aW9uLmNvbHVtbiArPSBvZmZzZXRcbiAgICAgIHBvc2l0aW9uLm9mZnNldCArPSBvZmZzZXRcblxuICAgICAgb3B0aW9ucy53YXJuaW5nLmNhbGwoXG4gICAgICAgIG9wdGlvbnMud2FybmluZ0NvbnRleHQsXG4gICAgICAgIG1lc3NhZ2VzW2NvZGVdLFxuICAgICAgICBwb3NpdGlvbixcbiAgICAgICAgY29kZVxuICAgICAgKVxuICAgIH1cbiAgfVxuXG4gIC8qKlxuICAgKiBGbHVzaCBgcXVldWVgIChub3JtYWwgdGV4dCkuXG4gICAqIE1hY3JvIGludm9rZWQgYmVmb3JlIGVhY2ggcmVmZXJlbmNlIGFuZCBhdCB0aGUgZW5kIG9mIGB2YWx1ZWAuXG4gICAqIERvZXMgbm90aGluZyB3aGVuIGBxdWV1ZWAgaXMgZW1wdHkuXG4gICAqL1xuICBmdW5jdGlvbiBmbHVzaCgpIHtcbiAgICBpZiAocXVldWUpIHtcbiAgICAgIHJlc3VsdC5wdXNoKHF1ZXVlKVxuXG4gICAgICBpZiAob3B0aW9ucy50ZXh0KSB7XG4gICAgICAgIG9wdGlvbnMudGV4dC5jYWxsKG9wdGlvbnMudGV4dENvbnRleHQsIHF1ZXVlLCB7XG4gICAgICAgICAgc3RhcnQ6IHByZXZpb3VzLFxuICAgICAgICAgIGVuZDogbm93KClcbiAgICAgICAgfSlcbiAgICAgIH1cblxuICAgICAgcXVldWUgPSAnJ1xuICAgIH1cbiAgfVxufVxuXG4vKipcbiAqIENoZWNrIGlmIGBjaGFyYWN0ZXJgIGlzIG91dHNpZGUgdGhlIHBlcm1pc3NpYmxlIHVuaWNvZGUgcmFuZ2UuXG4gKlxuICogQHBhcmFtIHtudW1iZXJ9IGNvZGVcbiAqIEByZXR1cm5zIHtib29sZWFufVxuICovXG5mdW5jdGlvbiBwcm9oaWJpdGVkKGNvZGUpIHtcbiAgcmV0dXJuIChjb2RlID49IDB4ZDgwMCAmJiBjb2RlIDw9IDB4ZGZmZikgfHwgY29kZSA+IDB4MTBmZmZmXG59XG5cbi8qKlxuICogQ2hlY2sgaWYgYGNoYXJhY3RlcmAgaXMgZGlzYWxsb3dlZC5cbiAqXG4gKiBAcGFyYW0ge251bWJlcn0gY29kZVxuICogQHJldHVybnMge2Jvb2xlYW59XG4gKi9cbmZ1bmN0aW9uIGRpc2FsbG93ZWQoY29kZSkge1xuICByZXR1cm4gKFxuICAgIChjb2RlID49IDB4MDAwMSAmJiBjb2RlIDw9IDB4MDAwOCkgfHxcbiAgICBjb2RlID09PSAweDAwMGIgfHxcbiAgICAoY29kZSA+PSAweDAwMGQgJiYgY29kZSA8PSAweDAwMWYpIHx8XG4gICAgKGNvZGUgPj0gMHgwMDdmICYmIGNvZGUgPD0gMHgwMDlmKSB8fFxuICAgIChjb2RlID49IDB4ZmRkMCAmJiBjb2RlIDw9IDB4ZmRlZikgfHxcbiAgICAoY29kZSAmIDB4ZmZmZikgPT09IDB4ZmZmZiB8fFxuICAgIChjb2RlICYgMHhmZmZmKSA9PT0gMHhmZmZlXG4gIClcbn1cbiJdLCJuYW1lcyI6W10sInNvdXJjZVJvb3QiOiIifQ==\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/parse-entities/lib/index.js\n");

/***/ })

};
;