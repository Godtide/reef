import React from 'react';
import {Main} from './componenets/Main';
import './App.css';
import {Web3Provider, OceanProvider, Config} from '@oceanprotocol/react'
import Web3 from 'web3';
import {BrowserRouter as Router, Switch, Route, Link} from "react-router-dom";
import Compute from './componenets/compute/Compute';
import ViewCompute from './componenets/compute/ViewCompute';
import ViewAlgorithms from './componenets/algorithms/ViewAlgorithms';
import CreateAlgorithm from './componenets/algorithms/CreateAlgorithm';
import CreateAsset from './componenets/assets/CreateAsset';
import ViewJobs from './componenets/Jobs/ViewJobs';

declare global {
    interface Window {
        web3: any;
        ethereum: any;
    }
}

if (window.web3) { // web3 = new Web3(window.web3.currentProvider)
    window.ethereum.enable()
}

const config: Config = {
    web3Provider: new Web3(window.web3.currentProvider),
    nodeUri: 'http://localhost:8545',
    aquariusUri: 'http://aquarius:5000',
    brizoUri: 'http://localhost:8030',
    brizoAddress: '0x00bd138abd70e2f00903268f3db08f2d25677c9e',
    secretStoreUri: 'http://localhost:12001',
    verbose: true
}

function App() {
    return (<div className="App">
        <Web3Provider>
            <OceanProvider config={config}>
                <Main></Main>
                <Switch>
                    <Route path="/assets/view">
                        <ViewCompute/>
                    </Route>
                    <Route path="/assets/create">
                        <CreateAsset/>
                    </Route>
                    <Route path="/algorithms/view">
                        <ViewAlgorithms/>
                    </Route>
                    <Route path="/algorithms/create">
                        <CreateAlgorithm/>
                    </Route>
                    <Route path="/compute/view">
                        <ViewCompute/>
                    </Route>
                    <Route path="/compute/create">
                        <Compute/>
                    </Route>
                    <Route path="/jobs">
                        <ViewJobs/>
                    </Route>
                </Switch>
            </OceanProvider>
        </Web3Provider>
    </div>);
}

export default App;
