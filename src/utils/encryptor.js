import JSEncrypt from 'jsencrypt'

function encodes(publicKey=undefined,password=undefined){
    if (publicKey==undefined||password==undefined)
    {
        throw new Error('publicKey and password is requried');
    }
    let encode=new JSEncrypt();
    encode.setPublicKey(publicKey);
    let suPassword=encode.encrypt(password);
    return suPassword;

}
export default encodes