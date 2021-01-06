import {expect} from 'chai'
import {shallowMount} from '@vue/test-utils'
import Home from '@/components/home/views/home-index'

describe('Home', () => {
  it('renders title', () => {
    const wrapper = shallowMount(Home)
    expect(wrapper.find('p').text()).to.contain('Welcome to homepage !')
  })
})