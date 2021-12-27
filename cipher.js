// this works like base64 but different. idk I followed a base64 tutorial as a "basis" but it came out wrong. still works though
(() => {
	// stolen from https://stackoverflow.com/a/37826698/15317442
	function splitarray(array, chunksize) {
		return array.reduce((result, item, index) => { 
			const chunk_index = Math.floor(index / chunksize)
			
			if(!result[chunk_index]) {
				result[chunk_index] = []; // start a new chunk
			}
			
			result[chunk_index].push(item)
			
			return result
		}, []);
	}
	
	function string_to_binary(string) {
		let binary = [];
		for (let i = 0; i < string.length; i++) {
			binary.push(string[i].charCodeAt(0).toString(2));
		}
		return binary;
	}
	
	function binary_to_string(binary) {
		let string = "";
		for (let i in binary) {
			string += String.fromCharCode(parseInt(binary[i], 2));
		}
		return string;
	}
	
	function encode_string(str) {
		str = encodeURIComponent(str);
		let newstr = "";
		let bytes = string_to_binary(str);
		
		for (let i in bytes) {
			bytes[i] = "0".repeat(8 - bytes[i].length) + bytes[i]; // make sure all bytes are byte-sized
		}
		
		let bits = bytes.join("");
		let groups = splitarray(bits.split(""), 6); // split binary into 6-bit groups
				
		for (let i in groups) {
			groups[i] = groups[i].join("");
			newstr += String.fromCharCode(parseInt(groups[i], 2) + 60); // convert to string, with the character being 60 after the group's value
		}
		
		return newstr;
	}
	
	function decode_string(str) {
		let newstr = "";
		let groups = [];
		
		for (let i = 0; i < str.length; i++) {
			groups.push((str[i].charCodeAt(0) - 60).toString(2)); // convert each character back to a 6-bit group
		}
		
		for (let i = 0; i < groups.length - 1; i++) {
			groups[i] = "0".repeat(6 - groups[i].length) + groups[i]; // pad groups
		}
				
		
		let bytes = splitarray(groups.join("").split(""), 8); // convert groups of 6 to groups of 8
		
		for (let i in bytes) {
			bytes[i] = bytes[i].join("");
		}
		
		newstr = binary_to_string(bytes);
		newstr = decodeURIComponent(newstr);
		return newstr;
	}
	window.cipher = {
		encode: encode_string,
		decode: decode_string
	};
})();
