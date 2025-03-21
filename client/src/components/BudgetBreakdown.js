import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  Grid,
  LinearProgress,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Button,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
} from '@mui/material';
import {
  Savings,
  TrendingDown,
  Lightbulb,
  Flight,
  Hotel,
  LocalActivity,
  Restaurant,
  CurrencyExchange,
} from '@mui/icons-material';
import { motion } from 'framer-motion';
import { PieChart } from '@mui/x-charts/PieChart';

const currencies = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
];

const formatAmount = (amount, currency) => {
  const currencyObj = currencies.find(c => c.code === currency);
  if (!currencyObj) return `$${amount}`;

  // Simple conversion rates (in real app, these would come from an API)
  const rates = {
    USD: 1,
    EUR: 0.92,
    GBP: 0.79,
    JPY: 150.58,
    AUD: 1.53,
  };

  const convertedAmount = amount * rates[currency];
  return `${currencyObj.symbol}${convertedAmount.toFixed(2)}`;
};

const BudgetItem = ({ label, amount, total, icon, currency }) => {
  const percentage = (amount / total) * 100;

  return (
    <Box sx={{ mb: 2 }}>
      <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
        <ListItemIcon sx={{ minWidth: 40 }}>
          {icon}
        </ListItemIcon>
        <Typography variant="body1" sx={{ flexGrow: 1 }}>
          {label}
        </Typography>
        <Typography variant="body1" color="text.secondary">
          {formatAmount(amount, currency)}
        </Typography>
      </Box>
      <LinearProgress
        variant="determinate"
        value={percentage}
        sx={{
          height: 8,
          borderRadius: 4,
          backgroundColor: 'grey.200',
          '& .MuiLinearProgress-bar': {
            borderRadius: 4,
          },
        }}
      />
    </Box>
  );
};

const SavingsSuggestion = ({ title, description, savings, icon, currency }) => (
  <ListItem>
    <ListItemIcon>
      {icon}
    </ListItemIcon>
    <ListItemText
      primary={
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
          <Typography variant="subtitle1">{title}</Typography>
          <Chip
            label={`Save ${formatAmount(savings, currency)}`}
            color="success"
            size="small"
            icon={<Savings />}
          />
        </Box>
      }
      secondary={description}
    />
  </ListItem>
);

const BudgetBreakdown = () => {
  const [currency, setCurrency] = useState('USD');
  
  const budgetData = {
    total: 1000,
    breakdown: {
      transportation: 400,
      accommodation: 300,
      activities: 200,
      food: 100,
    },
    suggestions: [
      {
        title: 'Take the Train Instead of Flight',
        description: 'Save on transportation by choosing the train option',
        savings: 150,
        icon: <TrendingDown color="success" />,
      },
      {
        title: 'Stay at Budget Hostel',
        description: 'Save per night by choosing a hostel over a hotel',
        savings: 60,
        icon: <TrendingDown color="success" />,
      },
      {
        title: 'Book Activities in Advance',
        description: 'Get 15% off on all activities when booking early',
        savings: 30,
        icon: <TrendingDown color="success" />,
      },
    ],
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <Paper sx={{ p: 4, mt: 6 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h4">
            Budget Breakdown
          </Typography>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="currency-select-label">Currency</InputLabel>
            <Select
              labelId="currency-select-label"
              value={currency}
              label="Currency"
              onChange={(e) => setCurrency(e.target.value)}
              startAdornment={<CurrencyExchange sx={{ mr: 1 }} />}
            >
              {currencies.map((curr) => (
                <MenuItem key={curr.code} value={curr.code}>
                  {curr.code} ({curr.symbol})
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        </Box>

        <Grid container spacing={4}>
          <Grid item xs={12} md={8}>
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" gutterBottom>
                Total Budget: {formatAmount(budgetData.total, currency)}
              </Typography>
              <BudgetItem
                label="Transportation"
                amount={budgetData.breakdown.transportation}
                total={budgetData.total}
                icon={<Flight />}
                currency={currency}
              />
              <BudgetItem
                label="Accommodation"
                amount={budgetData.breakdown.accommodation}
                total={budgetData.total}
                icon={<Hotel />}
                currency={currency}
              />
              <BudgetItem
                label="Activities"
                amount={budgetData.breakdown.activities}
                total={budgetData.total}
                icon={<LocalActivity />}
                currency={currency}
              />
              <BudgetItem
                label="Food"
                amount={budgetData.breakdown.food}
                total={budgetData.total}
                icon={<Restaurant />}
                currency={currency}
              />
            </Box>

            <Button
              variant="contained"
              color="primary"
              startIcon={<Savings />}
              fullWidth
              sx={{ mt: 2 }}
            >
              View All Money-Saving Tips
            </Button>
          </Grid>

          <Grid item xs={12} md={4}>
            <Box sx={{ bgcolor: 'grey.50', p: 2, borderRadius: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                <Lightbulb color="primary" />
                Money-Saving Tips
              </Typography>
              <Divider sx={{ my: 2 }} />
              <List>
                {budgetData.suggestions.map((suggestion, index) => (
                  <React.Fragment key={index}>
                    <SavingsSuggestion {...suggestion} currency={currency} />
                    {index < budgetData.suggestions.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </motion.div>
  );
};

export default BudgetBreakdown; 