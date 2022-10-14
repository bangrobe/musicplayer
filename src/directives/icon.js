export default {
    beforeMount(el, binding) {
        let iconClass = `fa fa-${binding.value} text-xl`

        if(binding.arg ==='full') {
            iconClass = binding.value;
        }
        //modifiers: v-icon.right
        if(binding.modifiers.right) {
            iconClass += ' float-right';
        }   
        //modifiers: v-icon.yellow
        if (binding.modifiers.yellow) {
            iconClass += ' text-yellow-400'
        }
        //Khong co modifiers
        else {
            iconClass += ' text-green-400'
        }
        el.innerHTML += `<i class="${iconClass}"></i>`
    }
}