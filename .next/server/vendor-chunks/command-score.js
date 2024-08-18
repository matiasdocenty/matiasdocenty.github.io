"use strict";
/*
 * ATTENTION: An "eval-source-map" devtool has been used.
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file with attached SourceMaps in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
exports.id = "vendor-chunks/command-score";
exports.ids = ["vendor-chunks/command-score"];
exports.modules = {

/***/ "(ssr)/./node_modules/command-score/index.js":
/*!*********************************************!*\
  !*** ./node_modules/command-score/index.js ***!
  \*********************************************/
/***/ ((module) => {

eval("// The scores are arranged so that a continuous match of characters will\n// result in a total score of 1.\n//\n// The best case, this character is a match, and either this is the start\n// of the string, or the previous character was also a match.\n\nvar SCORE_CONTINUE_MATCH = 1, // A new match at the start of a word scores better than a new match\n// elsewhere as it's more likely that the user will type the starts\n// of fragments.\n// (Our notion of word includes CamelCase and hypen-separated, etc.)\nSCORE_WORD_JUMP = 0.9, // Any other match isn't ideal, but we include it for completeness.\nSCORE_CHARACTER_JUMP = 0.3, // If the user transposed two letters, it should be signficantly penalized.\n//\n// i.e. \"ouch\" is more likely than \"curtain\" when \"uc\" is typed.\nSCORE_TRANSPOSITION = 0.1, // If the user jumped to half-way through a subsequent word, it should be\n// very significantly penalized.\n//\n// i.e. \"loes\" is very unlikely to match \"loch ness\".\n// NOTE: this is set to 0 for superhuman right now, but we may want to revisit.\nSCORE_LONG_JUMP = 0, // The goodness of a match should decay slightly with each missing\n// character.\n//\n// i.e. \"bad\" is more likely than \"bard\" when \"bd\" is typed.\n//\n// This will not change the order of suggestions based on SCORE_* until\n// 100 characters are inserted between matches.\nPENALTY_SKIPPED = 0.999, // The goodness of an exact-case match should be higher than a\n// case-insensitive match by a small amount.\n//\n// i.e. \"HTML\" is more likely than \"haml\" when \"HM\" is typed.\n//\n// This will not change the order of suggestions based on SCORE_* until\n// 1000 characters are inserted between matches.\nPENALTY_CASE_MISMATCH = 0.9999, // If the word has more characters than the user typed, it should\n// be penalised slightly.\n//\n// i.e. \"html\" is more likely than \"html5\" if I type \"html\".\n//\n// However, it may well be the case that there's a sensible secondary\n// ordering (like alphabetical) that it makes sense to rely on when\n// there are many prefix matches, so we don't make the penalty increase\n// with the number of tokens.\nPENALTY_NOT_COMPLETE = 0.99;\nvar IS_GAP_REGEXP = /[\\\\\\/\\-_+.# \\t\"@\\[\\(\\{&]/, COUNT_GAPS_REGEXP = /[\\\\\\/\\-_+.# \\t\"@\\[\\(\\{&]/g;\nfunction commandScoreInner(string, abbreviation, lowerString, lowerAbbreviation, stringIndex, abbreviationIndex) {\n    if (abbreviationIndex === abbreviation.length) {\n        if (stringIndex === string.length) {\n            return SCORE_CONTINUE_MATCH;\n        }\n        return PENALTY_NOT_COMPLETE;\n    }\n    var abbreviationChar = lowerAbbreviation.charAt(abbreviationIndex);\n    var index = lowerString.indexOf(abbreviationChar, stringIndex);\n    var highScore = 0;\n    var score, transposedScore, wordBreaks;\n    while(index >= 0){\n        score = commandScoreInner(string, abbreviation, lowerString, lowerAbbreviation, index + 1, abbreviationIndex + 1);\n        if (score > highScore) {\n            if (index === stringIndex) {\n                score *= SCORE_CONTINUE_MATCH;\n            } else if (IS_GAP_REGEXP.test(string.charAt(index - 1))) {\n                score *= SCORE_WORD_JUMP;\n                wordBreaks = string.slice(stringIndex, index - 1).match(COUNT_GAPS_REGEXP);\n                if (wordBreaks && stringIndex > 0) {\n                    score *= Math.pow(PENALTY_SKIPPED, wordBreaks.length);\n                }\n            } else if (IS_GAP_REGEXP.test(string.slice(stringIndex, index - 1))) {\n                score *= SCORE_LONG_JUMP;\n                if (stringIndex > 0) {\n                    score *= Math.pow(PENALTY_SKIPPED, index - stringIndex);\n                }\n            } else {\n                score *= SCORE_CHARACTER_JUMP;\n                if (stringIndex > 0) {\n                    score *= Math.pow(PENALTY_SKIPPED, index - stringIndex);\n                }\n            }\n            if (string.charAt(index) !== abbreviation.charAt(abbreviationIndex)) {\n                score *= PENALTY_CASE_MISMATCH;\n            }\n        }\n        if (score < SCORE_TRANSPOSITION && lowerString.charAt(index - 1) === lowerAbbreviation.charAt(abbreviationIndex + 1) && lowerString.charAt(index - 1) !== lowerAbbreviation.charAt(abbreviationIndex)) {\n            transposedScore = commandScoreInner(string, abbreviation, lowerString, lowerAbbreviation, index + 1, abbreviationIndex + 2);\n            if (transposedScore * SCORE_TRANSPOSITION > score) {\n                score = transposedScore * SCORE_TRANSPOSITION;\n            }\n        }\n        if (score > highScore) {\n            highScore = score;\n        }\n        index = lowerString.indexOf(abbreviationChar, index + 1);\n    }\n    return highScore;\n}\nfunction commandScore(string, abbreviation) {\n    /* NOTE:\n     * in the original, we used to do the lower-casing on each recursive call, but this meant that toLowerCase()\n     * was the dominating cost in the algorithm, passing both is a little ugly, but considerably faster.\n     */ return commandScoreInner(string, abbreviation, string.toLowerCase(), abbreviation.toLowerCase(), 0, 0);\n}\nmodule.exports = commandScore;\n//# sourceURL=[module]\n//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiKHNzcikvLi9ub2RlX21vZHVsZXMvY29tbWFuZC1zY29yZS9pbmRleC5qcyIsIm1hcHBpbmdzIjoiQUFBQSx3RUFBd0U7QUFDeEUsZ0NBQWdDO0FBQ2hDLEVBQUU7QUFDRix5RUFBeUU7QUFDekUsNkRBQTZEOztBQUM3RCxJQUFJQSx1QkFBdUIsR0FFdkIsb0VBQW9FO0FBQ3BFLG1FQUFtRTtBQUNuRSxnQkFBZ0I7QUFDaEIsb0VBQW9FO0FBQ3BFQyxrQkFBa0IsS0FFbEIsbUVBQW1FO0FBQ25FQyx1QkFBdUIsS0FFdkIsMkVBQTJFO0FBQzNFLEVBQUU7QUFDRixnRUFBZ0U7QUFDaEVDLHNCQUFzQixLQUV0Qix5RUFBeUU7QUFDekUsZ0NBQWdDO0FBQ2hDLEVBQUU7QUFDRixxREFBcUQ7QUFDckQsK0VBQStFO0FBQy9FQyxrQkFBa0IsR0FFbEIsa0VBQWtFO0FBQ2xFLGFBQWE7QUFDYixFQUFFO0FBQ0YsNERBQTREO0FBQzVELEVBQUU7QUFDRix1RUFBdUU7QUFDdkUsK0NBQStDO0FBQy9DQyxrQkFBa0IsT0FFbEIsOERBQThEO0FBQzlELDRDQUE0QztBQUM1QyxFQUFFO0FBQ0YsNkRBQTZEO0FBQzdELEVBQUU7QUFDRix1RUFBdUU7QUFDdkUsZ0RBQWdEO0FBQ2hEQyx3QkFBd0IsUUFFeEIsaUVBQWlFO0FBQ2pFLHlCQUF5QjtBQUN6QixFQUFFO0FBQ0YsNERBQTREO0FBQzVELEVBQUU7QUFDRixxRUFBcUU7QUFDckUsbUVBQW1FO0FBQ25FLHVFQUF1RTtBQUN2RSw2QkFBNkI7QUFDN0JDLHVCQUF1QjtBQUUzQixJQUFJQyxnQkFBZ0IsNEJBQ2hCQyxvQkFBb0I7QUFFeEIsU0FBU0Msa0JBQWtCQyxNQUFNLEVBQUVDLFlBQVksRUFBRUMsV0FBVyxFQUFFQyxpQkFBaUIsRUFBRUMsV0FBVyxFQUFFQyxpQkFBaUI7SUFFM0csSUFBSUEsc0JBQXNCSixhQUFhSyxNQUFNLEVBQUU7UUFDM0MsSUFBSUYsZ0JBQWdCSixPQUFPTSxNQUFNLEVBQUU7WUFDL0IsT0FBT2pCO1FBRVg7UUFDQSxPQUFPTztJQUNYO0lBRUEsSUFBSVcsbUJBQW1CSixrQkFBa0JLLE1BQU0sQ0FBQ0g7SUFDaEQsSUFBSUksUUFBUVAsWUFBWVEsT0FBTyxDQUFDSCxrQkFBa0JIO0lBQ2xELElBQUlPLFlBQVk7SUFFaEIsSUFBSUMsT0FBT0MsaUJBQWlCQztJQUU1QixNQUFPTCxTQUFTLEVBQUc7UUFFZkcsUUFBUWIsa0JBQWtCQyxRQUFRQyxjQUFjQyxhQUFhQyxtQkFBbUJNLFFBQVEsR0FBR0osb0JBQW9CO1FBQy9HLElBQUlPLFFBQVFELFdBQVc7WUFDbkIsSUFBSUYsVUFBVUwsYUFBYTtnQkFDdkJRLFNBQVN2QjtZQUNiLE9BQU8sSUFBSVEsY0FBY2tCLElBQUksQ0FBQ2YsT0FBT1EsTUFBTSxDQUFDQyxRQUFRLEtBQUs7Z0JBQ3JERyxTQUFTdEI7Z0JBQ1R3QixhQUFhZCxPQUFPZ0IsS0FBSyxDQUFDWixhQUFhSyxRQUFRLEdBQUdRLEtBQUssQ0FBQ25CO2dCQUN4RCxJQUFJZ0IsY0FBY1YsY0FBYyxHQUFHO29CQUMvQlEsU0FBU00sS0FBS0MsR0FBRyxDQUFDekIsaUJBQWlCb0IsV0FBV1IsTUFBTTtnQkFDeEQ7WUFDSixPQUFPLElBQUlULGNBQWNrQixJQUFJLENBQUNmLE9BQU9nQixLQUFLLENBQUNaLGFBQWFLLFFBQVEsS0FBSztnQkFDakVHLFNBQVNuQjtnQkFDVCxJQUFJVyxjQUFjLEdBQUc7b0JBQ2pCUSxTQUFTTSxLQUFLQyxHQUFHLENBQUN6QixpQkFBaUJlLFFBQVFMO2dCQUMvQztZQUNKLE9BQU87Z0JBQ0hRLFNBQVNyQjtnQkFDVCxJQUFJYSxjQUFjLEdBQUc7b0JBQ2pCUSxTQUFTTSxLQUFLQyxHQUFHLENBQUN6QixpQkFBaUJlLFFBQVFMO2dCQUMvQztZQUNKO1lBRUEsSUFBSUosT0FBT1EsTUFBTSxDQUFDQyxXQUFXUixhQUFhTyxNQUFNLENBQUNILG9CQUFvQjtnQkFDakVPLFNBQVNqQjtZQUNiO1FBRUo7UUFFQSxJQUFJaUIsUUFBUXBCLHVCQUNKVSxZQUFZTSxNQUFNLENBQUNDLFFBQVEsT0FBT04sa0JBQWtCSyxNQUFNLENBQUNILG9CQUFvQixNQUMvRUgsWUFBWU0sTUFBTSxDQUFDQyxRQUFRLE9BQU9OLGtCQUFrQkssTUFBTSxDQUFDSCxvQkFBb0I7WUFDbkZRLGtCQUFrQmQsa0JBQWtCQyxRQUFRQyxjQUFjQyxhQUFhQyxtQkFBbUJNLFFBQVEsR0FBR0osb0JBQW9CO1lBRXpILElBQUlRLGtCQUFrQnJCLHNCQUFzQm9CLE9BQU87Z0JBQy9DQSxRQUFRQyxrQkFBa0JyQjtZQUM5QjtRQUNKO1FBRUEsSUFBSW9CLFFBQVFELFdBQVc7WUFDbkJBLFlBQVlDO1FBQ2hCO1FBRUFILFFBQVFQLFlBQVlRLE9BQU8sQ0FBQ0gsa0JBQWtCRSxRQUFRO0lBQzFEO0lBRUEsT0FBT0U7QUFDWDtBQUVBLFNBQVNTLGFBQWFwQixNQUFNLEVBQUVDLFlBQVk7SUFDdEM7OztLQUdDLEdBQ0QsT0FBT0Ysa0JBQWtCQyxRQUFRQyxjQUFjRCxPQUFPcUIsV0FBVyxJQUFJcEIsYUFBYW9CLFdBQVcsSUFBSSxHQUFHO0FBQ3hHO0FBRUFDLE9BQU9DLE9BQU8sR0FBR0giLCJzb3VyY2VzIjpbIndlYnBhY2s6Ly9zdG9yeWJvb2stc2hhZGNuLy4vbm9kZV9tb2R1bGVzL2NvbW1hbmQtc2NvcmUvaW5kZXguanM/MGZmNyJdLCJzb3VyY2VzQ29udGVudCI6WyIvLyBUaGUgc2NvcmVzIGFyZSBhcnJhbmdlZCBzbyB0aGF0IGEgY29udGludW91cyBtYXRjaCBvZiBjaGFyYWN0ZXJzIHdpbGxcbi8vIHJlc3VsdCBpbiBhIHRvdGFsIHNjb3JlIG9mIDEuXG4vL1xuLy8gVGhlIGJlc3QgY2FzZSwgdGhpcyBjaGFyYWN0ZXIgaXMgYSBtYXRjaCwgYW5kIGVpdGhlciB0aGlzIGlzIHRoZSBzdGFydFxuLy8gb2YgdGhlIHN0cmluZywgb3IgdGhlIHByZXZpb3VzIGNoYXJhY3RlciB3YXMgYWxzbyBhIG1hdGNoLlxudmFyIFNDT1JFX0NPTlRJTlVFX01BVENIID0gMSxcblxuICAgIC8vIEEgbmV3IG1hdGNoIGF0IHRoZSBzdGFydCBvZiBhIHdvcmQgc2NvcmVzIGJldHRlciB0aGFuIGEgbmV3IG1hdGNoXG4gICAgLy8gZWxzZXdoZXJlIGFzIGl0J3MgbW9yZSBsaWtlbHkgdGhhdCB0aGUgdXNlciB3aWxsIHR5cGUgdGhlIHN0YXJ0c1xuICAgIC8vIG9mIGZyYWdtZW50cy5cbiAgICAvLyAoT3VyIG5vdGlvbiBvZiB3b3JkIGluY2x1ZGVzIENhbWVsQ2FzZSBhbmQgaHlwZW4tc2VwYXJhdGVkLCBldGMuKVxuICAgIFNDT1JFX1dPUkRfSlVNUCA9IDAuOSxcblxuICAgIC8vIEFueSBvdGhlciBtYXRjaCBpc24ndCBpZGVhbCwgYnV0IHdlIGluY2x1ZGUgaXQgZm9yIGNvbXBsZXRlbmVzcy5cbiAgICBTQ09SRV9DSEFSQUNURVJfSlVNUCA9IDAuMyxcblxuICAgIC8vIElmIHRoZSB1c2VyIHRyYW5zcG9zZWQgdHdvIGxldHRlcnMsIGl0IHNob3VsZCBiZSBzaWduZmljYW50bHkgcGVuYWxpemVkLlxuICAgIC8vXG4gICAgLy8gaS5lLiBcIm91Y2hcIiBpcyBtb3JlIGxpa2VseSB0aGFuIFwiY3VydGFpblwiIHdoZW4gXCJ1Y1wiIGlzIHR5cGVkLlxuICAgIFNDT1JFX1RSQU5TUE9TSVRJT04gPSAwLjEsXG5cbiAgICAvLyBJZiB0aGUgdXNlciBqdW1wZWQgdG8gaGFsZi13YXkgdGhyb3VnaCBhIHN1YnNlcXVlbnQgd29yZCwgaXQgc2hvdWxkIGJlXG4gICAgLy8gdmVyeSBzaWduaWZpY2FudGx5IHBlbmFsaXplZC5cbiAgICAvL1xuICAgIC8vIGkuZS4gXCJsb2VzXCIgaXMgdmVyeSB1bmxpa2VseSB0byBtYXRjaCBcImxvY2ggbmVzc1wiLlxuICAgIC8vIE5PVEU6IHRoaXMgaXMgc2V0IHRvIDAgZm9yIHN1cGVyaHVtYW4gcmlnaHQgbm93LCBidXQgd2UgbWF5IHdhbnQgdG8gcmV2aXNpdC5cbiAgICBTQ09SRV9MT05HX0pVTVAgPSAwLFxuXG4gICAgLy8gVGhlIGdvb2RuZXNzIG9mIGEgbWF0Y2ggc2hvdWxkIGRlY2F5IHNsaWdodGx5IHdpdGggZWFjaCBtaXNzaW5nXG4gICAgLy8gY2hhcmFjdGVyLlxuICAgIC8vXG4gICAgLy8gaS5lLiBcImJhZFwiIGlzIG1vcmUgbGlrZWx5IHRoYW4gXCJiYXJkXCIgd2hlbiBcImJkXCIgaXMgdHlwZWQuXG4gICAgLy9cbiAgICAvLyBUaGlzIHdpbGwgbm90IGNoYW5nZSB0aGUgb3JkZXIgb2Ygc3VnZ2VzdGlvbnMgYmFzZWQgb24gU0NPUkVfKiB1bnRpbFxuICAgIC8vIDEwMCBjaGFyYWN0ZXJzIGFyZSBpbnNlcnRlZCBiZXR3ZWVuIG1hdGNoZXMuXG4gICAgUEVOQUxUWV9TS0lQUEVEID0gMC45OTksXG5cbiAgICAvLyBUaGUgZ29vZG5lc3Mgb2YgYW4gZXhhY3QtY2FzZSBtYXRjaCBzaG91bGQgYmUgaGlnaGVyIHRoYW4gYVxuICAgIC8vIGNhc2UtaW5zZW5zaXRpdmUgbWF0Y2ggYnkgYSBzbWFsbCBhbW91bnQuXG4gICAgLy9cbiAgICAvLyBpLmUuIFwiSFRNTFwiIGlzIG1vcmUgbGlrZWx5IHRoYW4gXCJoYW1sXCIgd2hlbiBcIkhNXCIgaXMgdHlwZWQuXG4gICAgLy9cbiAgICAvLyBUaGlzIHdpbGwgbm90IGNoYW5nZSB0aGUgb3JkZXIgb2Ygc3VnZ2VzdGlvbnMgYmFzZWQgb24gU0NPUkVfKiB1bnRpbFxuICAgIC8vIDEwMDAgY2hhcmFjdGVycyBhcmUgaW5zZXJ0ZWQgYmV0d2VlbiBtYXRjaGVzLlxuICAgIFBFTkFMVFlfQ0FTRV9NSVNNQVRDSCA9IDAuOTk5OSxcblxuICAgIC8vIElmIHRoZSB3b3JkIGhhcyBtb3JlIGNoYXJhY3RlcnMgdGhhbiB0aGUgdXNlciB0eXBlZCwgaXQgc2hvdWxkXG4gICAgLy8gYmUgcGVuYWxpc2VkIHNsaWdodGx5LlxuICAgIC8vXG4gICAgLy8gaS5lLiBcImh0bWxcIiBpcyBtb3JlIGxpa2VseSB0aGFuIFwiaHRtbDVcIiBpZiBJIHR5cGUgXCJodG1sXCIuXG4gICAgLy9cbiAgICAvLyBIb3dldmVyLCBpdCBtYXkgd2VsbCBiZSB0aGUgY2FzZSB0aGF0IHRoZXJlJ3MgYSBzZW5zaWJsZSBzZWNvbmRhcnlcbiAgICAvLyBvcmRlcmluZyAobGlrZSBhbHBoYWJldGljYWwpIHRoYXQgaXQgbWFrZXMgc2Vuc2UgdG8gcmVseSBvbiB3aGVuXG4gICAgLy8gdGhlcmUgYXJlIG1hbnkgcHJlZml4IG1hdGNoZXMsIHNvIHdlIGRvbid0IG1ha2UgdGhlIHBlbmFsdHkgaW5jcmVhc2VcbiAgICAvLyB3aXRoIHRoZSBudW1iZXIgb2YgdG9rZW5zLlxuICAgIFBFTkFMVFlfTk9UX0NPTVBMRVRFID0gMC45OTtcblxudmFyIElTX0dBUF9SRUdFWFAgPSAvW1xcXFxcXC9cXC1fKy4jIFxcdFwiQFxcW1xcKFxceyZdLyxcbiAgICBDT1VOVF9HQVBTX1JFR0VYUCA9IC9bXFxcXFxcL1xcLV8rLiMgXFx0XCJAXFxbXFwoXFx7Jl0vZztcblxuZnVuY3Rpb24gY29tbWFuZFNjb3JlSW5uZXIoc3RyaW5nLCBhYmJyZXZpYXRpb24sIGxvd2VyU3RyaW5nLCBsb3dlckFiYnJldmlhdGlvbiwgc3RyaW5nSW5kZXgsIGFiYnJldmlhdGlvbkluZGV4KSB7XG5cbiAgICBpZiAoYWJicmV2aWF0aW9uSW5kZXggPT09IGFiYnJldmlhdGlvbi5sZW5ndGgpIHtcbiAgICAgICAgaWYgKHN0cmluZ0luZGV4ID09PSBzdHJpbmcubGVuZ3RoKSB7XG4gICAgICAgICAgICByZXR1cm4gU0NPUkVfQ09OVElOVUVfTUFUQ0g7XG5cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gUEVOQUxUWV9OT1RfQ09NUExFVEU7XG4gICAgfVxuXG4gICAgdmFyIGFiYnJldmlhdGlvbkNoYXIgPSBsb3dlckFiYnJldmlhdGlvbi5jaGFyQXQoYWJicmV2aWF0aW9uSW5kZXgpO1xuICAgIHZhciBpbmRleCA9IGxvd2VyU3RyaW5nLmluZGV4T2YoYWJicmV2aWF0aW9uQ2hhciwgc3RyaW5nSW5kZXgpO1xuICAgIHZhciBoaWdoU2NvcmUgPSAwO1xuXG4gICAgdmFyIHNjb3JlLCB0cmFuc3Bvc2VkU2NvcmUsIHdvcmRCcmVha3M7XG5cbiAgICB3aGlsZSAoaW5kZXggPj0gMCkge1xuXG4gICAgICAgIHNjb3JlID0gY29tbWFuZFNjb3JlSW5uZXIoc3RyaW5nLCBhYmJyZXZpYXRpb24sIGxvd2VyU3RyaW5nLCBsb3dlckFiYnJldmlhdGlvbiwgaW5kZXggKyAxLCBhYmJyZXZpYXRpb25JbmRleCArIDEpO1xuICAgICAgICBpZiAoc2NvcmUgPiBoaWdoU2NvcmUpIHtcbiAgICAgICAgICAgIGlmIChpbmRleCA9PT0gc3RyaW5nSW5kZXgpIHtcbiAgICAgICAgICAgICAgICBzY29yZSAqPSBTQ09SRV9DT05USU5VRV9NQVRDSDtcbiAgICAgICAgICAgIH0gZWxzZSBpZiAoSVNfR0FQX1JFR0VYUC50ZXN0KHN0cmluZy5jaGFyQXQoaW5kZXggLSAxKSkpIHtcbiAgICAgICAgICAgICAgICBzY29yZSAqPSBTQ09SRV9XT1JEX0pVTVA7XG4gICAgICAgICAgICAgICAgd29yZEJyZWFrcyA9IHN0cmluZy5zbGljZShzdHJpbmdJbmRleCwgaW5kZXggLSAxKS5tYXRjaChDT1VOVF9HQVBTX1JFR0VYUCk7XG4gICAgICAgICAgICAgICAgaWYgKHdvcmRCcmVha3MgJiYgc3RyaW5nSW5kZXggPiAwKSB7XG4gICAgICAgICAgICAgICAgICAgIHNjb3JlICo9IE1hdGgucG93KFBFTkFMVFlfU0tJUFBFRCwgd29yZEJyZWFrcy5sZW5ndGgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSBpZiAoSVNfR0FQX1JFR0VYUC50ZXN0KHN0cmluZy5zbGljZShzdHJpbmdJbmRleCwgaW5kZXggLSAxKSkpIHtcbiAgICAgICAgICAgICAgICBzY29yZSAqPSBTQ09SRV9MT05HX0pVTVA7XG4gICAgICAgICAgICAgICAgaWYgKHN0cmluZ0luZGV4ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBzY29yZSAqPSBNYXRoLnBvdyhQRU5BTFRZX1NLSVBQRUQsIGluZGV4IC0gc3RyaW5nSW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICAgICAgc2NvcmUgKj0gU0NPUkVfQ0hBUkFDVEVSX0pVTVA7XG4gICAgICAgICAgICAgICAgaWYgKHN0cmluZ0luZGV4ID4gMCkge1xuICAgICAgICAgICAgICAgICAgICBzY29yZSAqPSBNYXRoLnBvdyhQRU5BTFRZX1NLSVBQRUQsIGluZGV4IC0gc3RyaW5nSW5kZXgpO1xuICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cblxuICAgICAgICAgICAgaWYgKHN0cmluZy5jaGFyQXQoaW5kZXgpICE9PSBhYmJyZXZpYXRpb24uY2hhckF0KGFiYnJldmlhdGlvbkluZGV4KSkge1xuICAgICAgICAgICAgICAgIHNjb3JlICo9IFBFTkFMVFlfQ0FTRV9NSVNNQVRDSDtcbiAgICAgICAgICAgIH1cblxuICAgICAgICB9XG5cbiAgICAgICAgaWYgKHNjb3JlIDwgU0NPUkVfVFJBTlNQT1NJVElPTiAmJlxuICAgICAgICAgICAgICAgIGxvd2VyU3RyaW5nLmNoYXJBdChpbmRleCAtIDEpID09PSBsb3dlckFiYnJldmlhdGlvbi5jaGFyQXQoYWJicmV2aWF0aW9uSW5kZXggKyAxKSAmJlxuICAgICAgICAgICAgICAgIGxvd2VyU3RyaW5nLmNoYXJBdChpbmRleCAtIDEpICE9PSBsb3dlckFiYnJldmlhdGlvbi5jaGFyQXQoYWJicmV2aWF0aW9uSW5kZXgpKSB7XG4gICAgICAgICAgICB0cmFuc3Bvc2VkU2NvcmUgPSBjb21tYW5kU2NvcmVJbm5lcihzdHJpbmcsIGFiYnJldmlhdGlvbiwgbG93ZXJTdHJpbmcsIGxvd2VyQWJicmV2aWF0aW9uLCBpbmRleCArIDEsIGFiYnJldmlhdGlvbkluZGV4ICsgMik7XG5cbiAgICAgICAgICAgIGlmICh0cmFuc3Bvc2VkU2NvcmUgKiBTQ09SRV9UUkFOU1BPU0lUSU9OID4gc2NvcmUpIHtcbiAgICAgICAgICAgICAgICBzY29yZSA9IHRyYW5zcG9zZWRTY29yZSAqIFNDT1JFX1RSQU5TUE9TSVRJT047XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoc2NvcmUgPiBoaWdoU2NvcmUpIHtcbiAgICAgICAgICAgIGhpZ2hTY29yZSA9IHNjb3JlO1xuICAgICAgICB9XG5cbiAgICAgICAgaW5kZXggPSBsb3dlclN0cmluZy5pbmRleE9mKGFiYnJldmlhdGlvbkNoYXIsIGluZGV4ICsgMSk7XG4gICAgfVxuXG4gICAgcmV0dXJuIGhpZ2hTY29yZTtcbn1cblxuZnVuY3Rpb24gY29tbWFuZFNjb3JlKHN0cmluZywgYWJicmV2aWF0aW9uKSB7XG4gICAgLyogTk9URTpcbiAgICAgKiBpbiB0aGUgb3JpZ2luYWwsIHdlIHVzZWQgdG8gZG8gdGhlIGxvd2VyLWNhc2luZyBvbiBlYWNoIHJlY3Vyc2l2ZSBjYWxsLCBidXQgdGhpcyBtZWFudCB0aGF0IHRvTG93ZXJDYXNlKClcbiAgICAgKiB3YXMgdGhlIGRvbWluYXRpbmcgY29zdCBpbiB0aGUgYWxnb3JpdGhtLCBwYXNzaW5nIGJvdGggaXMgYSBsaXR0bGUgdWdseSwgYnV0IGNvbnNpZGVyYWJseSBmYXN0ZXIuXG4gICAgICovXG4gICAgcmV0dXJuIGNvbW1hbmRTY29yZUlubmVyKHN0cmluZywgYWJicmV2aWF0aW9uLCBzdHJpbmcudG9Mb3dlckNhc2UoKSwgYWJicmV2aWF0aW9uLnRvTG93ZXJDYXNlKCksIDAsIDApO1xufVxuXG5tb2R1bGUuZXhwb3J0cyA9IGNvbW1hbmRTY29yZTtcbiJdLCJuYW1lcyI6WyJTQ09SRV9DT05USU5VRV9NQVRDSCIsIlNDT1JFX1dPUkRfSlVNUCIsIlNDT1JFX0NIQVJBQ1RFUl9KVU1QIiwiU0NPUkVfVFJBTlNQT1NJVElPTiIsIlNDT1JFX0xPTkdfSlVNUCIsIlBFTkFMVFlfU0tJUFBFRCIsIlBFTkFMVFlfQ0FTRV9NSVNNQVRDSCIsIlBFTkFMVFlfTk9UX0NPTVBMRVRFIiwiSVNfR0FQX1JFR0VYUCIsIkNPVU5UX0dBUFNfUkVHRVhQIiwiY29tbWFuZFNjb3JlSW5uZXIiLCJzdHJpbmciLCJhYmJyZXZpYXRpb24iLCJsb3dlclN0cmluZyIsImxvd2VyQWJicmV2aWF0aW9uIiwic3RyaW5nSW5kZXgiLCJhYmJyZXZpYXRpb25JbmRleCIsImxlbmd0aCIsImFiYnJldmlhdGlvbkNoYXIiLCJjaGFyQXQiLCJpbmRleCIsImluZGV4T2YiLCJoaWdoU2NvcmUiLCJzY29yZSIsInRyYW5zcG9zZWRTY29yZSIsIndvcmRCcmVha3MiLCJ0ZXN0Iiwic2xpY2UiLCJtYXRjaCIsIk1hdGgiLCJwb3ciLCJjb21tYW5kU2NvcmUiLCJ0b0xvd2VyQ2FzZSIsIm1vZHVsZSIsImV4cG9ydHMiXSwic291cmNlUm9vdCI6IiJ9\n//# sourceURL=webpack-internal:///(ssr)/./node_modules/command-score/index.js\n");

/***/ })

};
;