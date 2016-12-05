import makeFlows from 'converse/lib/contrib/middleware/receive/makeFlows'
import Assume from './Assume'
import Help from './Help'

const flows = [
  new Assume(),
  new Help(),
]

export default makeFlows({ flows })
