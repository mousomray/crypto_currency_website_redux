import React, { useState } from 'react';
import Wrapper from '../Common/Wrapper'
import { useQuery } from '@tanstack/react-query'
import { coinlist } from '../reducers/coinslice'
import { useDispatch } from 'react-redux'

// MUI Importation
import { styled } from '@mui/material/styles';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import Table from '@mui/material/Table';
import Box from '@mui/material/Box';
import Grid from '@mui/material/Grid';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import DetailsIcon from '@mui/icons-material/Details';
import { Link } from 'react-router-dom'; // Import Link

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const StyledTableCell = styled(TableCell)(({ theme }) => ({
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
    },
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
    },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover,
    },
    // hide last border
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

const Home = () => {
    const [open, setOpen] = useState(false);
    const [selectedCoin, setSelectedCoin] = useState(null); // State to track selected coin

    const handleOpen = (coin) => {
        setSelectedCoin(coin);
        setOpen(true);
    };

    const handleClose = () => setOpen(false);

    const dispatch = useDispatch();
    const [searchQuery, setSearchQuery] = useState(''); // For Search Coin

    const getCoindata = async () => {
        const response = await dispatch(coinlist());
        return response?.payload;
    };

    // Use Query Area
    const { isLoading, isError, data: coindata, error, refetch } = useQuery({
        queryKey: ['coindata'],
        queryFn: getCoindata
    });

    // Handle For Search
    const handleSearchChange = (event) => {
        setSearchQuery(event.target.value);
    };

    // Filter products based on search query
    const filteredCoins = coindata?.filter((coin) =>
        coin.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    // For Loading
    if (isLoading) {
        return (
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)' }}>
                <h1>Loading...</h1>
            </div>
        );
    }

    // For Error
    if (isError) {
        return <h1>{error.message}</h1>;
    }

    return (
        <>
            <Wrapper>
                <TableContainer component={Paper} style={{ marginTop: '100px' }}>
                    <input
                        type="text"
                        placeholder="Search coins..."
                        value={searchQuery}
                        onChange={handleSearchChange}
                        style={{ marginBottom: '20px', width: '100%', padding: '10px', justifyContent: 'center', borderRadius: '50px' }}
                    />
                    <Table sx={{ minWidth: 700 }} aria-label="customized table">
                        <TableHead>
                            <TableRow>
                                <StyledTableCell>Rank</StyledTableCell>
                                <StyledTableCell align="center">Name</StyledTableCell>
                                <StyledTableCell align="center">Symbol</StyledTableCell>
                                <StyledTableCell align="center">Details</StyledTableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {Array.isArray(filteredCoins) && filteredCoins?.length !== 0 ? (
                                filteredCoins.map((row) => (
                                    <StyledTableRow key={row.name}>
                                        <StyledTableCell align="center">{row.rank}</StyledTableCell>
                                        <StyledTableCell align="center">{row.name}</StyledTableCell>
                                        <StyledTableCell align="center">{row.symbol}</StyledTableCell>
                                        <StyledTableCell align="center">
                                            <Button onClick={() => handleOpen(row)}>Details</Button>
                                        </StyledTableCell>
                                    </StyledTableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={4} align="center">
                                        <Typography variant="subtitle1" color="textSecondary">
                                            No coins found
                                        </Typography>
                                    </TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>

                {/* Modal Body Area Start */}
                <Modal
                    open={open}
                    onClose={handleClose}
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                >
                    <Box sx={style}>
                        {selectedCoin && (
                            <>
                                <Typography id="modal-modal-title" variant="h6" component="h2">
                                    {selectedCoin.name} Details
                                </Typography>
                                <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Symbol: {selectedCoin.symbol}
                                    <br />
                                    Rank: {selectedCoin.rank}
                                    <br />
                                    Supply : {selectedCoin.supply}
                                    <br />
                                    Max Supply : {selectedCoin.maxSupply}
                                </Typography>
                            </>
                        )}
                    </Box>
                </Modal>
                {/* Modal Body Area End */}

            </Wrapper>
        </>
    );
};

export default Home;
