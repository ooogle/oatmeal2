(() => {
	let alphabet = "plank4ouchOUCHthIsOTEZwWkKPAN_#7^9I{}[]|()&*%1:;\"'><?/,.!\\@2356-+=~`";
	let splitter = "$";
	let inverse_alpha = {}
	
	for (let i = 0; i < alphabet.length; i++) {
		inverse_alpha[alphabet[i]] = i;
	}
	
	function encode_string(str) {
		let chars = [];
		let newstr = "";
		for (let i in str) {
			chars[i] = str[i].charCodeAt();
		}
		
		function encodechar(char) {
			if (char < alphabet.length) {
				return alphabet[char];
			}
			let char1 = Math.floor(char / 2) + char % 2;
			let char2 = char - char1;
			return encodechar(char1) + encodechar(char2)
		}
		
		for (let char of chars) {
			newstr += encodechar(char) + splitter;
		}
		return newstr;
	}
	
	function decode_string(str) {
		let chars = str.split(splitter);
		chars.pop();
		let newstr = "";
		
		function decodechar(char) {
			let ints = char.split("");
			let charcode = 0;
			for (let int of ints) {
				charcode += inverse_alpha[int];
			}
			return String.fromCharCode(charcode);
		}
		
		for (let char of chars) {
			newstr += decodechar(char);
		}
		return newstr;
	}
	window.cipher = {
		encode: encode_string,
		decode: decode_string
	};
})();
