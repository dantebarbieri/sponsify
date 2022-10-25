import * as React from 'react';
import { Grid } from '@mui/material';
import Logo from '../../../assets/images/logos/logo.png';
import { theme } from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import Button from '@mui/material/Button';
import { Paper } from '@mui/material';
import IconButton from '@mui/material/IconButton';
import InfoIcon from '@mui/icons-material/Info';
import Modal from '@mui/material/Modal';
import Box from '@mui/material/Box';
import Inbox from '../Inbox/App'
import SWELogo from '../../../assets/images/graphics/SWE_logo.png';
import HowItWorksContents from '../../molecule/HowItWorksContents/App'
import CartItem from '../../molecule/CartItem/App'
import TextField from '@mui/material/TextField'
import { useCart } from '../../../contexts/Cart';


interface Props {
    student_org_name: string,
    student_org_logo: string,
    level_name: string,
    level_color: string
}

const Checkout = (props: Props) => {

    const { student_org_name, student_org_logo, level_color, level_name } = props

    const [openInfo, setOpenInfo] = React.useState(false);
    const handleOpenInfo = () => setOpenInfo(true);
    const handleCloseInfo = () => setOpenInfo(false);

    const [firstNameInput, setFirstNameInput] = React.useState('');
    const [lastNameInput, setLastNameInput] = React.useState('');
    const [emailInput, setEmailInput] = React.useState('');
    const [companyInput, setCompanyInput] = React.useState('');
    const checkoutReady = firstNameInput && lastNameInput && emailInput && companyInput;

    const [checkedOut, setCheckedOut] = React.useState(false);

    const { addToCart, removeFromCart, cart } = useCart();
    const total = cart.reduce((total, item) => total + item.price, 0);
    // TODO: get level_name and level_color from cart items, not as prop

    console.log(cart)

    const submitCheckout = () => {
        if (cart.at(0) && checkoutReady ) {
            fetch('/checkout-events', {
                method: 'POST',
                headers: {
                    Accept: 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    firstName: firstNameInput,
                    lastName: lastNameInput,
                    company: companyInput,
                    email: emailInput,
                    sponsorLevel: level_name,
                    events: cart.map(item => item.id),
                    totalAmount: total,
                    org: student_org_name
                })
            })
            setCheckedOut(true);
        }
    };

    return (
        checkedOut ? <Inbox student_org_logo={SWELogo} /> : 
        <ThemeProvider theme={theme}>

            <Modal
                open={openInfo}
                onClose={handleCloseInfo}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
                disableScrollLock
            >
                <Box sx={{
                    position: 'absolute' as 'absolute',
                    top: '50%',
                    left: '50%',
                    transform: 'translate(-50%, -50%)',
                    maxWidth: theme.spacing(200),
                    minWidth: theme.spacing(200),
                    maxHeight: theme.spacing(100),
                    minHeight: theme.spacing(100),
                    bgcolor: 'background.paper',
                    boxShadow: 24,
                    p: 4,
                    overflow: 'scroll',
                }}>
                    <HowItWorksContents />
                </Box>
            </Modal>

            <Grid container>
                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', margin: theme.spacing(6) }}>
                    <IconButton onClick={handleOpenInfo} color="secondary" aria-label="Info" >
                        <InfoIcon />
                    </IconButton>
                </Grid>

                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                </Grid>

                <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img style={{ maxHeight: theme.spacing(30), marginTop: theme.spacing(10) }} src={Logo} alt="Sponsify logo" />
                </Grid>

                <Grid item xs={2} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(18) }}>
                    <Typography variant="h4" sx={{ fontFamily: "Oxygen" }}>
                        x
                    </Typography>
                </Grid>

                <Grid item xs={1} sx={{ display: 'flex', justifyContent: 'center' }}>
                    <img style={{ maxHeight: theme.spacing(30), marginTop: theme.spacing(10) }} src={student_org_logo} alt="Sponsify logo" />
                </Grid>

                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing(10) }}>
                    <Typography variant="h4">
                        Selected Events
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing(10) }}>
                    <TextField 
                        sx={{ minWidth: theme.spacing(80), mr: theme.spacing(10) }} 
                        id="outlined-basic" 
                        label="First Name" 
                        variant="outlined"
                        value={firstNameInput} 
                        onChange={ev => setFirstNameInput(ev.target.value)} />
                    <TextField 
                        sx={{ minWidth: theme.spacing(80) }}
                        id="outlined-basic"
                        label="Last Name"
                        variant="outlined"
                        value={lastNameInput} 
                        onChange={ev => setLastNameInput(ev.target.value)} />
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing(10), mb: theme.spacing(5) }}>
                    <TextField 
                        sx={{ minWidth: theme.spacing(80), mr: theme.spacing(10) }} 
                        id="outlined-basic" 
                        label="Email" 
                        variant="outlined"
                        value={emailInput} 
                        onChange={ev => setEmailInput(ev.target.value)} />
                    <TextField 
                        sx={{ minWidth: theme.spacing(80) }}
                        id="outlined-basic"
                        label="Company"
                        variant="outlined"
                        value={companyInput}
                        onChange={ev => setCompanyInput(ev.target.value)} />
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', m: theme.spacing(2) }}>
                    <Paper variant="outlined" sx={{ borderStyle: "none none solid none", borderWidth: theme.spacing(.5), borderRadius: 0, borderColor: "#c2c2c2", maxWidth: theme.spacing(180), minWidth: theme.spacing(180), minHeight: theme.spacing(10), mt: theme.spacing(4) }} >
                        <Typography variant="body1" sx={{ pl: theme.spacing(5) }}>
                            SPONSORED ITEMS
                        </Typography>
                    </Paper>
                </Grid>

                {cart.map(item => {
                    return (
                        <Grid key={item.id} item xs={12} sx={{ display: 'flex', justifyContent: 'center', m: theme.spacing(2) }}>
                            <CartItem name={item.name} short_description={item.short_description} price={item.price} quantity={item.quantity} date_start={item.date_start} date_end={item.date_end} id={item.id} />
                        </Grid>
                    )
                })}

                <Grid item xs={9} sx={{ display: 'flex', justifyContent: 'right', mt: theme.spacing(4), mb: theme.spacing(4), }}>
                    <Typography variant="body1" sx={{ fontWeight: 600, pt: theme.spacing(2), textAlign: 'center', color: "#367c63" }}>Total:     ${total}</Typography>
                </Grid>


                <Grid item xs={9} sx={{ display: 'flex', justifyContent: 'right', }}>
                    <Paper sx={{ borderRadius: 0, background: `#${level_color}`, maxWidth: theme.spacing(40), minWidth: theme.spacing(40), minHeight: theme.spacing(10) }} elevation={0}>
                        <Typography variant="body1" sx={{ fontWeight: 600, pt: theme.spacing(2), textAlign: 'center' }}>{level_name} Sponsor</Typography>
                    </Paper>
                </Grid>


                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', margin: theme.spacing(6) }}>
                    <Button onClick={submitCheckout} variant="contained" size="large" color="primary" sx={{
                        borderRadius: 0,
                        pt: theme.spacing(3),
                        pb: theme.spacing(3),
                        pl: theme.spacing(8),
                        pr: theme.spacing(8),
                        ml: theme.spacing(5),
                    }}>Submit</Button>
                </Grid>


            </Grid>

        </ThemeProvider>
    )
}

export default Checkout