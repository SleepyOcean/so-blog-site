import CryptoJS from 'crypto-js'

let Decrypt = {};
Decrypt.decrypt = function(str,key,iv)
{
	var key			= CryptoJS.MD5(key).toString();
	var iv			= CryptoJS.MD5(iv).toString();
	var crypto_key 	= CryptoJS.enc.Utf8.parse(key);
	var crypto_iv 	= CryptoJS.enc.Utf8.parse(iv.substr(0,8));
	var decrypt_str	= CryptoJS.TripleDES.decrypt(str,crypto_key,{iv:crypto_iv,mode:CryptoJS.mode.CBC,padding:CryptoJS.pad.Pkcs7});
	return 	decrypt_str.toString(CryptoJS.enc.Utf8);
}

export default Decrypt;
