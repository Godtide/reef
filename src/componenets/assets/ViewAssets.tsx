import React, {useContext, useEffect, useState} from 'react';
import {MyOceanContext} from '../../OceanContext';
import {DDO} from '@oceanprotocol/squid';
import {Grid, Card, CardContent, Typography} from '@material-ui/core';
import AssetDetails from './AssetDetails';
import {useSelector, useDispatch} from 'react-redux';
import {RootState} from '../../redux';
import {setAssetListInfo} from '../../slices/asset-list';

const ViewAssets = () => {
    const {instance, stakeApp, web3} = useContext(MyOceanContext)
    const {assets} = useSelector((state : RootState) => state.assetList);
    const dispatch = useDispatch();
    const {getAllStakes} = stakeApp ?. methods;

    const getData = async () => {
        console.log('loading assets...')
        const result = instance ?. assets.search('xzyabc123')
        if (result !== undefined && web3 !== null) {
            const accounts: String[] = await web3.eth.getAccounts();

            result.then(async (r) => {
                const a = r.results.filter(r => r.service.find(e => e.attributes.main.type === 'dataset'));
                const dids: String[] = a.map(ddo => ddo.id);
                const res = await getAllStakes(dids).call({from: accounts[0]});
                // const res2 = res.map((r : Object, index : number) => [
                //     r.amount, r.count, dids[index]
                // ])
                // .then(res => console.log(res)).catch(err => console.log(err));
                console.log(res)
                dispatch(setAssetListInfo(a, []));
            })

        } else {
            console.log('result undefined')
        }
    }
    useEffect(() => {
        getData()
    }, [])

    return (
        <div>
            <Grid container
                spacing={3}>
                <Card>
                    <CardContent>
                        <Typography>
                            ViewAssets
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <br/>
            <div>
                <Grid container>
                    <Grid container direction="column">
                        <Grid container
                            spacing={3}>
                            {
                            assets.map((value : DDO) => (
                                <Grid item
                                    xs={12}
                                    sm={4}
                                    key={
                                        value.id
                                }>
                                    <AssetDetails assetInfo={value}></AssetDetails>
                                </Grid>
                            ))
                        } </Grid>
                    </Grid>
                </Grid>
            </div>
        </div>
    )
}

export default ViewAssets
