import React from "react";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as Dialog from "@radix-ui/react-dialog";
import { ArrowCircleDown, ArrowCircleUp, X } from "phosphor-react";
import * as z from "zod";
import { useContextSelector } from "use-context-selector";
import { TransactionsContext } from "../../contexts/TransactionsContext";
import {
  CloseButton,
  Content,
  Overlay,
  TransactionType,
  TransactionTypeButton,
} from "./styles";

const newTransactionFormSchema = z.object({
  description: z.string(),
  price: z.number(),
  category: z.string(),
  type: z.enum(["income", "expense"]),
});

type NewTransactionFormInputs = z.infer<typeof newTransactionFormSchema>;

export function NewTransactionModal() {
  const createTransaction = useContextSelector(
    TransactionsContext,
    (context) => context.createTransaction
  );

  const {
    control,
    register,
    handleSubmit,
    formState: { isSubmitting },
    reset,
  } = useForm<NewTransactionFormInputs>({
    resolver: zodResolver(newTransactionFormSchema),
    defaultValues: { type: "income" },
  });

  async function handleCreateNewTransaction(data: NewTransactionFormInputs) {
    await createTransaction({ ...data });
    reset();
  }

  return (
    <Dialog.Portal>
      <Overlay />
      <Content>
        <Dialog.Title>New Transaction</Dialog.Title>
        <CloseButton>
          <X size={24} />
        </CloseButton>
        <form onSubmit={handleSubmit(handleCreateNewTransaction)}>
          {["description", "price", "category"].map((field) => (
            <input
              key={field}
              type={field === "price" ? "number" : "text"}
              placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
              required
              {...register(field, { valueAsNumber: field === "price" })}
            />
          ))}
          <Controller
            control={control}
            name="type"
            render={({ field }) => (
              <TransactionType onValueChange={field.onChange} value={field.value}>
                {[
                  { variant: "income", label: "Incomes", icon: <ArrowCircleUp size={24} /> },
                  { variant: "expense", label: "Expenses", icon: <ArrowCircleDown size={24} /> },
                ].map(({ variant, label, icon }) => (
                  <TransactionTypeButton key={variant} variant={variant} value={variant}>
                    {icon}
                    {label}
                  </TransactionTypeButton>
                ))}
              </TransactionType>
            )}
          />
          <button type="submit" disabled={isSubmitting}>
            ADD
          </button>
        </form>
      </Content>
    </Dialog.Portal>
  );
}
