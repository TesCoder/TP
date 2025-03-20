import { Button } from "@/components/Button";
import { packages } from "@/data/agreementInfo";
import encryptor from "@/lib/hash";
import { useState } from "react";
import { members } from "../components/membersList";

export async function getServerSideProps(context) {
  return {
    props: {
      hostname: context.req.headers.host,
    }, // will be passed to the page component as props
  }
}

export default function GenerateUrl({ hostname }) {
  // console.log("HOSTNAME:", hostname)
  const [packageType, setPackageType] = useState('essays-only')
  const [numSchools, setNumSchools] = useState()
  const [price, setPrice] = useState()
  const [coach, setCoach] = useState()

  const [url, setUrl] = useState()
  const [hash, setHash] = useState()

  const handleChange = (e) => {
    // console.log("GOT:", e.target.value)
    switch (e.target.name) {
      case "package":
        setPackageType(e.target.value)
        break;

      case "num-schools":
        setNumSchools(e.target.value)
        break;

      case "cost":
        setPrice(e.target.value)
        break;

      case "coach":
        setCoach(e.target.value)
        break;

      default:
        break;
    }
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    // const toHash = [packageType, numSchools, price].join("-")
    setUrl(`${window.location.protocol}//${hostname}/agreement?packageType=${packageType}&schools=${numSchools}&price=${price}&coach=${coach}`)
    // const hashed = encryptor.encrypt(toHash)
    // setHash(hashed)
  }


  return (
    <div className="bg-gray-100 h-screen flex flex-col justify-center items-center">
      <div className="bg-white  w-4/5 md:w-1/2 px-5 py-3 shadow-lg rounded-lg">
        <h1 className="text-center text-2xl font-bold">Generate Url</h1>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <label htmlFor="year" className="form-label">
              Package Type
              {/* Package Type is now {packageType} <br />
              Num schools is now {numSchools}<br />
              Price is now {price} <br />
              URL: {url} <br />
              Hashed: {hash}
              Unhashed: {encryptor.decrypt(hash)} */}
            </label>
            <select className="form-select" id='package' name='package' onChange={handleChange} aria-label="Package Type" defaultValue="essays-only">
              {Object.entries(packages).map(([key, value]) => <option key={key} value={key}>{value}</option>)})
            </select>
          </div>
          <div className='mb-3'>
            <label htmlFor="year" className="form-label">
              Coach
            </label>
            <select className="form-select" id='coach' name='coach' defaultValue="" onChange={handleChange} aria-label="coach" required>
              <option value="" >Select a Coach</option>
              {members.map(({ name }, idx) => <option key={idx} value={name.split(" ").join("-")}>{name}</option>)})
            </select>
          </div>
          <div className="row mb-3">
            <div className="col">
              {/* <input type="text" onChange={handleChange} className="form-control" name="num-schools" placeholder="# of Schools" aria-label="Number of Schools" required /> */}
              <select className="form-select" id='num-schools' name='num-schools' defaultValue="" onChange={handleChange} aria-label="Number of schools" required>
                <option value="" >Select # of Schools</option>
                {[5, 10, 15, 20].map((val, idx) => <option key={idx} value={val}>{val}</option>)})
              </select>
            </div>
            <div className="col">
              <input type="text" onChange={handleChange} className="form-control" name="cost" placeholder="Cost" aria-label="Cost" required />
            </div>
          </div>
          <Button type="submit">Generate</Button>
        </form>

        {url && (
          <div>
            <hr className="my-3 mx-2" />
            <h1 className="font-bold text-lg my-1">Copy the generated url below</h1>
            <div className="flex gap-4 align-middle">
              <textarea value={url} className="form-control" readOnly />
              <div className="flex flex-col gap-2">
                <Button onClick={() => navigator.clipboard.writeText(url)}>Copy</Button>
                <Button onClick={() => window.open(url, "_blank")}>Open</Button>
              </div>
            </div>
          </div>
        )}
      </div >

    </div >
  )
}