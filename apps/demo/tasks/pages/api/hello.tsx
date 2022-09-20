import { NextApiRequest, NextApiResponse } from 'next'

const handle = async (req: NextApiRequest, res: NextApiResponse) => {
  res.json({ data: 'Hello World' })
}

export default handle
