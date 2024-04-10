import { defineConfig } from 'windicss/helpers'

export default defineConfig({
  /* 配置项... */
  theme: {
    extend: {
      colors: {
        
      }
    }
  },
  shortcuts: {
    'title':'text-15px font-bold mb-5px text-black before:content-DEFAULT before:inline-block before:w-3px before:h-12px before:bg-[#0089FF] before:mr-6px',
    'form-bg':'p-20px bg-white h-64px'
  },
})