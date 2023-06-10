import {Connection, PublicKey} from "@solana/web3.js"
import * as sd from "solana-disassembler";
import solana_disassembler_init from "solana-disassembler";

//TODO: set up process.env so we don't expose out api key
const connection = new Connection("https://rpc.helius.xyz/?api-key=56de2bc4-02f3-492b-b608-8b970b885691")

export default function Home() {

  async function test() {
    //Pull binary data from the blockchain.

    const pk = new PublicKey("A3zRq3PDXfFNawQnVGicAf2GDUEWppXo6EVk3gmZ2Ucu");
    const info = await connection.getAccountInfo(pk);

    //Initialize wasm binary asynchronously.
    //NOTE: Random snake case is because we access a wasm-pack generated function directly
    //https://stackoverflow.com/questions/73465599/rust-wasm-constructor-uncaught-typeerror-cannot-read-properties-of-undefined
    await solana_disassembler_init("https://localhost:3000/static/js/solana_disassembler.wasm");
  
    const elfFile = sd.ElfFile.new();
    if (info) {
      elfFile.load(info.data);
    }
    elfFile.list_sections();
    elfFile.disassemble();
  }
  
  test()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-sm lg:flex">
        <div className="fixed bottom-0 left-0 flex h-48 w-full items-end justify-center bg-gradient-to-t from-white via-white dark:from-black dark:via-black lg:static lg:h-auto lg:w-auto lg:bg-none">
        </div>
      </div>

      <div className="relative flex place-items-center before:absolute before:h-[300px] before:w-[480px] before:-translate-x-1/2 before:rounded-full before:bg-gradient-radial before:from-white before:to-transparent before:blur-2xl before:content-[''] after:absolute after:-z-20 after:h-[180px] after:w-[240px] after:translate-x-1/3 after:bg-gradient-conic after:from-sky-200 after:via-blue-200 after:blur-2xl after:content-[''] before:dark:bg-gradient-to-br before:dark:from-transparent before:dark:to-blue-700 before:dark:opacity-10 after:dark:from-sky-900 after:dark:via-[#0141ff] after:dark:opacity-40 before:lg:h-[360px]">
        test
      </div>

      <div className="mb-32 grid text-center lg:mb-0 lg:grid-cols-4 lg:text-left">



      </div>
    </main>
  )
}