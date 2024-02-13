import React from 'react';
import PropTypes from 'prop-types';
import { ArrowCircleDown, ArrowCircleUp, CurrencyDollar } from 'phosphor-react';
import { useSummary } from '../../hooks/useSummary';
import { priceFormatter } from '../../utils/formatter';
import { SummaryCard, SummaryContainer } from './styles';

const SummaryCardItem = ({ label, icon: Icon, color, value }) => (
  <SummaryCard>
    <header>
      <span>{label}</span>
      <Icon size={32} color={color} />
    </header>
    <strong>{priceFormatter.format(value)}</strong>
  </SummaryCard>
);

SummaryCardItem.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  color: PropTypes.string.isRequired,
  value: PropTypes.number.isRequired,
};

const Summary = () => {
  const summary = useSummary();

  return (
    <SummaryContainer>
      <SummaryCardItem label="Incomes" icon={ArrowCircleUp} color="#00b37e" value={summary.income} />
      <SummaryCardItem label="Expenses" icon={ArrowCircleDown} color="#f75a68" value={summary.expense} />
      <SummaryCardItem label="Total" icon={CurrencyDollar} color="#fff" value={summary.total} />
    </SummaryContainer>
  );
};

export default Summary;
