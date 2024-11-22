<script lang="ts" setup>
import { computed, reactive } from 'vue';

import { Page, z } from '@vben/common-ui';
import { $t } from '@vben/locales';
import { useVbenForm } from '@vben-core/form-ui';

const formSchema = [
  {
    component: 'VbenSelect',
    fieldName: 'test',
    label: $t('page.demos.test'),
    defaultValue: '1',
    description: '1111',
    help: '222',
    // renderComponentContent: (value, api) => { 
    //   default: () => { }
    // },
    componentProps: {
      placeholder: $t('page.demos.test'),
      options: [
        {
          label: 'aa',
          value: '1',
        },
      ],
    },
    rules: z.nullable(z.string()),
  },
  {
    component: 'VbenInput',
    componentProps: {
      placeholder: $t('authentication.mobile'),
    },
    fieldName: 'phoneNumber',
    label: $t('authentication.mobile'),
    rules: z
      .string()
      .min(1, { message: $t('authentication.mobileTip') })
      .refine((v) => /^\d{11}$/.test(v), {
        message: $t('authentication.mobileErrortip'),
      }),
  },
  {
    component: 'VbenPinInput',
    componentProps: {
      createText: (countdown: number) => {
        const text =
          countdown > 0
            ? $t('authentication.sendText', [countdown])
            : $t('authentication.sendCode');
        return text;
      },
      placeholder: $t('authentication.code'),
    },
    fieldName: 'code',
    label: $t('authentication.code'),
    rules: z.string().min(1, { message: $t('authentication.codeTip') }),
  },
];

const [Form, { validate }] = useVbenForm(
  reactive({
    commonConfig: {
      hideLabel: false,
      hideRequiredMark: true,
    },
    schema: computed(() => formSchema),
    showDefaultActions: false,
  }),
);
</script>

<template>
  <Page description="支持多语言，主题功能集成切换等" title="naive组件使用演示">
    <Form />
  </Page>
</template>

<style></style>
