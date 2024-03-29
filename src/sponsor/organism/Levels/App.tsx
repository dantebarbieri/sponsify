import React from 'react';
import { Grid } from '@mui/material';
import Logo from '../../../assets/images/logos/logo.png';
import { theme} from '../../../utils/theme';
import Typography from '@mui/material/Typography';
import { ThemeProvider } from '@mui/system';
import Button from '@mui/material/Button';
import Level from '../../molecule/Level/App';
import { GetAllLevels } from '../../../utils/api-types';

interface Props {
}

const Levels = (props: Props) => {

    const student_org_name = JSON.parse(localStorage.getItem('org-name') || '{}');
    const [logo, setLogo] = React.useState("")
    const [levels, setLevels] = React.useState<GetAllLevels>([])

    React.useEffect(() => {
        const fetchData = async() => {
            await fetch("/get-all-levels/" + student_org_name)
                .then((res) => res.json()) 
                .then((data: GetAllLevels) => {
                    data.sort((a, b) => (a.minAmount < b.minAmount) ? 1 : -1)
                    setLevels(data)
                })

        }
        fetchData()

    }, [student_org_name])

    React.useEffect(() => {
        const fetchLogo = async() => {
           try{
            //console.log(student_org_name)
             await fetch("/get-logo/" + student_org_name)
                .then((res) => res.json()) 
                .then((data1) => setLogo(data1.logoImage))
           }
           catch(e){
            console.log("Error fetching logo ",(e))
           }
               
        }
        
        fetchLogo() 

      },[student_org_name])

    return (

        <ThemeProvider theme={theme}>

            <Grid container>
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
                    <img style={{ maxHeight: theme.spacing(30), marginTop: theme.spacing(10) }} src={logo} alt="Sponsify logo" />
                </Grid>

                <Grid item xs={4} sx={{ display: 'flex', justifyContent: 'center' }}>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', marginTop: theme.spacing(10) }}>
                    <Typography variant="h4">
                        Sponsorship Levels
                    </Typography>
                </Grid>

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', margin: theme.spacing(6) }}>
                    <Typography variant="h6" sx={{ fontFamily: "Oxygen" }}>
                        Different levels come with <b style={{ color: "#4baa89" }}>different perks</b>
                    </Typography>
                </Grid>

                <>
                    {levels.map((level) =>   
                    <React.Fragment key={level._id}>
                            <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'center', mt: theme.spacing(8) }}>
                                <Level name={level.name} lower_bound={level.minAmount} description={level.description} upper_bound={level.maxAmount} color_level={level.color} />
                            </Grid>
                    </React.Fragment>
                    )}
                </>            

                <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'right', margin: theme.spacing(6) }}>
                    <Button 
                        href="/events"
                        variant="contained"
                        size="large"
                        color="secondary"
                        sx={{
                            color: 'white',
                            backgroundColor: '#434343',
                            borderRadius: 0,
                            fontFamily: 'Oxygen',
                            pt: theme.spacing(3),
                            pb: theme.spacing(3),
                            pl: theme.spacing(8),
                            pr: theme.spacing(8),
                            "&:hover": {
                                color: 'white',
                                backgroundColor: '#367c63',
                            }
                        }}>Next</Button>
                </Grid>


            </Grid>

        </ThemeProvider>


    )
}

export default Levels