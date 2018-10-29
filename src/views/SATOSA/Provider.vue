<template>
  <section id="satosa-provider">
    <h1>Editing provider details: {{provider.title}}</h1>

    <form>
      <template v-for="(input, idx) in provider.options">
        <div class="form-group" v-for="id in [input.name + ':' + idx]" v-if="input.kind === 'string'" :key="id">
          <label :for="id">{{input.title}}</label>
          <input type="text" class="form-control" :id="id"/>
          <small v-if="input.helpText" class="form-text text-muted">{{input.helpText}}</small>
        </div>
        <div class="form-group form-check" v-for="id in [input.name + ':' + idx]" v-if="input.kind === 'boolean'" :key="id">
          <input type="checkbox" class="form-check-input" :id="id" value="1"/>
          <label :for="id">{{input.title}}</label>
          <small v-if="input.helpText" class="form-text text-muted">{{input.helpText}}</small>
        </div>
      </template>

      <button class="btn btn-primary">Save</button>&nbsp;<button class="btn btn-secondary">Cancel</button>
    </form>

    <pre>{{ provider }}</pre>
  </section>
</template>

<script>
import providers from '@/api/providers'

export default {
  data () {
    var provider
    var name = this.$route.params.name
    providers.forEach((val) => {
      if (val.name === name) {
        provider = val
      }
    })
    return {
      provider: provider,
    }
  },
}
</script>
