var Web3 = require('web3');
var fs = require('fs');
var Tx = require('ethereumjs-tx');
var ethabi = require('web3-eth-abi');
class Database
{
    constructor()
    {
        this.contractAddress = '0x7bdfe0b795170586ce989ed8e08d25f104bfd583';
        this.gasPrice = '0xAB9ACA00';
        this.web3 = new Web3(new Web3.providers.HttpProvider("https://ropsten.infura.io/v3/cadf7874a8794c64bea89cb353f28d08"));
        this.abi = JSON.parse(fs.readFileSync("./NoteService_sol_NoteService.abi").toString());
        this.contract = this.web3.eth.contract(this.abi).at(this.contractAddress);

    }
    getNonce()
    {
        var nonce  = this.web3.eth.getTransactionCount("0x84E3F8ee60695c5a31181f29065c317b626f48f1")
        return nonce;
    }
    addUpdateNote(id, name, content, notefun)
    {

        var estimateGas = this.web3.eth.estimateGas({
            to: this.contractAddress,
            data: notefun
        });
        estimateGas = this.web3.toHex(estimateGas);
        var nonce = global.getNextNonce();

        //nonce  = this.web3.toHex(this.web3.eth.getTransactionCount("0x84E3F8ee60695c5a31181f29065c317b626f48f1"))
        //console.log('b:' + nonce)

        var rawTx = {
                nonce: nonce,
                gasPrice: this.gasPrice,
                gasLimit: estimateGas,
                to: this.contractAddress,
            value: '0x00',
            data: notefun
        }
        var tx = new Tx(rawTx);
        const privateKey = new Buffer('3272FF685C58B616750EB905CE672114EF990C197492F0D530B0EBDC59DF67F6', 'hex');
        tx.sign(privateKey);
        var serializedTx = tx.serialize();

        return this.web3.eth.sendRawTransaction('0x' + serializedTx.toString('hex'));
    }
    addNote(id, name, content)
    {
        var addNote = this.contract.addNote.getData(id, name, content);


        return this.addUpdateNote(id,name,content,addNote);

    }
    updateNote(id,name,content)
    {
        var updateNote = this.contract.updateNote.getData(id, name, content);
        return this.addUpdateNote(id,name,content,updateNote);
    }

    getNote(id,name)
    {
        var getNote = this.contract.getNote.getData(id,name);
        var result = this.web3.eth.call({
            to: this.contractAddress,
            data: getNote
        });
        return  ethabi.decodeParameter('string',result);
    }
    // 1：成功， 0：失败
    queryTransactionStatus(hash)
    {
        var result = this.web3.eth.getTransactionReceipt(hash);
        if(result != null)
        {
            return parseInt(result.status,16);
        }
        return null;

    }
}
module.exports = Database;