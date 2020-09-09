const Vue = require('vue/dist/vue.runtime.common')
const { mount } = require('@vue/test-utils')

describe('update-option', () => {
  const wrapper = mount({
    template: `
      <div>
        <vec-container
          ref="container"
          style="width: 100px; height: 100px;"
          animation
        >
          <vec-title :text="title" />
          <vec-title :text="title + '0'" />
        </vec-container>
      </div>
    `,

    data() {
      return {
        title: '1',
      }
    },
  })

  it('should works', async () => {
    const { vm } = wrapper

    expect(vm.$refs.container.$fullOption).toEqual({ animation: true })

    await sleep()

    expect(vm.$refs.container.$fullOption).toEqual({
      animation: true,
      title: [
        {
          id: 'vec-0',
          text: '1',
        },
        {
          id: 'vec-1',
          text: '10',
        },
      ],
    })

    vm.title = '2'

    await Vue.nextTick()

    expect(vm.$refs.container.$optionQueue.length).toEqual(0)

    await Vue.nextTick()

    expect(vm.$refs.container.$optionQueue.length).toEqual(2)

    await Vue.nextTick()

    await sleep()

    expect(vm.$refs.container.$fullOption).toEqual({
      animation: true,
      title: [
        {
          id: 'vec-0',
          text: '2',
        },
        {
          id: 'vec-1',
          text: '20',
        },
      ],
    })
  })
})
