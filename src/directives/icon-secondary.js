export default {
    beforeMount(el, binding) {
        let iconClass = `fa fa-${binding.value.icon} text-green-400 text-2xl`

        //locally directive
        if(binding.value.right) {
            iconClass += ' float-right';
        }   
 
        //Khong co modifiers
        el.innerHTML += `<i class="${iconClass}"></i>`
    }
}