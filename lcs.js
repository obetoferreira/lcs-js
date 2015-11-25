var prompt = require('prompt');

// Longest common subsequence
function longestCommonSubsequence(str1, str2) {

	var table = [],
		maxLen = Math.max(str1.length, str2.length);
	
	// Initialize a table of zeros
	for (var i = 0; i <= maxLen ; i++) {
		table.push([]);
		for (var j = 0; j <= maxLen; j++) {
			table[i][j] = 0;
		}
	}
	
	// Create a table of counts
	for (var i = 1; i <= str1.length; i++) {
		for (var j = 1; j <= str2.length; j++) {
			if (str1[i - 1] == str2[j - 1]) {
				table[i][j] = table[i - 1][j - 1] + 1;
			} else {
				table[i][j] = Math.max(table[i - 1][j], table[i][j - 1]);
			}
		}
	}

	// Move backwards along the table
	i = str1.length, j = str2.length, LCS = [];
	while (i > 0 && j > 0) {
		if (str1[i - 1] == str2[j - 1]) {
			LCS.push(str1[i - 1]);
			i -= 1;
			j -= 1;
		} else {
			if (table[i][j - 1] >= table[i - 1][j]) {
				j -= 1;
			} else {
				i -= 1;
			}
		}
	}
	return LCS.reverse().join('');
}

// Node Prompt
prompt.start();
prompt.get(['string1', 'string2'], function (err, result) {
	if (err) { return onErr(err); }
	console.log('Longest Common Subsequence: ' + longestCommonSubsequence(result.string1, result.string2));
	console.log('LCS length: ' + longestCommonSubsequence(result.string1, result.string2).length );
});

// Handle Errors
function onErr(err) {
	console.log(err);
	return 1;
}