import Reactotron from 'reactotron-react-native'
import { reactotronRedux } from 'reactotron-redux'

export default function configureReactotron () {
  Reactotron
    .configure()
    .useReactNative()
    .use(reactotronRedux())
    .connect() // let's connect!
}