import AddTransactionModal from "./AddTransactionModal";
import {Box, Button, Card, Container, Grid, Slide, Stack} from "@mui/material";
import ClearIcon from "@mui/icons-material/Clear";
import ModalDeleteWallets from "../layout/ModalDeleteWallets";
import * as React from "react";

export default function TransactionCard({openModal, closeModal}) {
    const [checked, setChecked] = React.useState(false);
    const openTransaction = () => {
        setChecked(true)
    }
    const closeTransaction = () => {
        setChecked(false)
    }

    return (
        <Container>
            <Grid container spacing={2}>
                <div className="container mt-[66px]  flex justify-center">
                    <Grid item xs={6}>
                        <div className="mt-10 w-[600px] h-[300px] bg-zinc-100 rounded-md bg overflow-hidden">
                            <div className="pt-4 bg-white">
                                <div className=" h-[48px] fomt-normal border-b flex justify-center mx">
                                    <button
                                        className="w-full py-[15px] uppercase leading-4 text-sm font-semibold text-zinc-400">Last
                                        Month
                                    </button>
                                    <button
                                        className="w-full py-[15px] uppercase leading-4 text-sm font-semibold border-b-4 border-lightgreen text-lightgreen">This
                                        Month
                                    </button>
                                    <button
                                        className="w-full py-[15px] uppercase leading-4 text-sm font-semibold text-zinc-400">Future
                                    </button>
                                </div>
                                {/*<div className="bg-zinc-100 text-center">*/}
                                {/*    <div>*/}
                                {/*        <span id="iconRotage" className="font-semibold text-[112px] pb-5 text-center inline-block text-zinc-500">{':-)'}</span>*/}
                                {/*    </div>*/}
                                {/*    <span className="text-2xl inline-block text-zinc-400"> No transactions</span>*/}
                                {/*</div>*/}
                                <Button fullWidth onClick={openTransaction}>demo</Button>
                            </div>
                            <AddTransactionModal isOpen={openModal} onClose={closeModal}
                            />
                        </div>
                    </Grid>

                    {checked && <Slide direction="left" in={checked} mountOnEnter unmountOnExit>
                        <div className="mt-10 w-full ml-9">
                            <Grid  item xs={6}>
                                <Card sx={{width:"600px"}} variant="outlined">
                                    <Box sx={{
                                        position: 'relative',
                                        color: "black",
                                        height: "50px",
                                        borderBottom: "1px solid #ececec"
                                    }}>
                                        <div style={{padding: "5px 10px",}}><Button onClick={closeTransaction}
                                                                                    sx={{color: "black"}}
                                        ><ClearIcon
                                            sx={{float: "left"}}/></Button>
                                            <b style={{marginLeft: "30px"}}>Transaction details
                                            </b>

                                            <Stack direction="row" sx={{float: "right"}} spacing={2}>
                                                <ModalDeleteWallets sx={{height: "402px"}}
                                                />
                                                <Button color='success'>EDIT</Button>
                                            </Stack>
                                        </div>
                                    </Box>
                                    <div fullWidth color="success"
                                         sx={{color: "black", justifyContent: "left", textAlign: "left"}}>
                                        <div>
                                            <div style={{textAlign: "left", margin: "15px"}}>
                                                <span className='lowercase'>{}</span><br/>
                                                <span className='lowercase'>{} </span>
                                                <span>{} </span>
                                            </div>
                                        </div>
                                    </div>
                                    <Button sx={{borderTop: "1px solid #ececec", color: "green"}}
                                            fullWidth
                                    >
                                        <Grid item xs={12}>
                                            <b>Archived</b>
                                        </Grid>
                                    </Button>
                                    <Button fullWidth
                                            sx={{borderTop: "1px solid #ececec", color: "green"}}>
                                        <Grid item xs={12}>
                                            <b>TRANFERMONEY</b>
                                        </Grid>
                                    </Button>
                                    <Button fullWidth sx={{borderTop: "1px solid #ececec", color: "green"}}>
                                        <Grid item xs={12}>
                                            <b>SHARE WALLET</b>
                                        </Grid>
                                    </Button>

                                </Card>
                            </Grid>
                        </div>
                    </Slide>}
                </div>


            </Grid>
        </Container>
    );
}