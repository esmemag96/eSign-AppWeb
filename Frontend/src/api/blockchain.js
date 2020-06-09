import Web3 from 'web3';
import { signAbi } from '../abi/abis';

const web3 = new Web3(Web3.givenProvider);
// contract address is provided by Truffle migration
const contractAddr = '0x56EE86Dcb463E00E604d4C407184fb1a27176BAe';
const SignContract = new web3.eth.Contract(signAbi, contractAddr);

// const [signees, setSignees] = useState("");
// const [signed, setSigned] = useState("");
// const [documentHash, setDocumentHash] = useState("");
// const [signee, setSignee] = useState("");
// const [documentOwner, setDocumentOwner] = useState("");


const handleUploadDocument = async (documentHash,signee) => {
    const accounts = await window.ethereum.enable();
    const account = accounts[0];
    const gas = await SignContract.methods.addSignee(documentHash, signee).estimateGas();
    const result = await SignContract.methods.addSignee(documentHash, signee).send({
      from: account,
      gas
    })
    console.log(result);
  }

//   const handleSign = async (e) => {
//     e.preventDefault();
//     const accounts = await window.ethereum.enable();
//     const account = accounts[0];
//     const gas = await SignContract.methods.sign(documentOwner, documentHash).estimateGas();
//     const result = await SignContract.methods.sign(documentOwner, documentHash).send({
//       from: account,
//       gas
//     })
//     console.log(result);
//   }

//   const handleGetAllSignees = async (e) => {
//     e.preventDefault();
//     const result = await SignContract.methods.getAllSignees(documentOwner, documentHash)
//       .call();
//     setSignees(result);
//     console.log(result);
//   }

//   const handleGetAllSigned = async (e) => {
//     e.preventDefault();
//     const result = await SignContract.methods.getAllSigned(documentOwner, documentHash)
//       .call();
//     setSigned(result);
//     console.log(result);
//   }
//   {signed != "" && ("Signed: " + signed) }

  export {
    handleUploadDocument,
    // handleSign,
    // handleGetAllSignees,
    // handleGetAllSigned
  }