<template>
  <div>
    <b-card bg-variant="light">
      <b-form-group
        label-cols-lg="3"
        label="Ajouter une photo :"
        label-size="lg"
        label-class="font-weight-bold pt-0"
        class="mb-0"
      >
        <b-form-group
          label-cols-sm="2"
          label="Description:"
          label-align-sm="right"
          label-for="desc"
        >
          <b-form-input id="desc"></b-form-input>
        </b-form-group>

        <b-form-group
          label-cols-sm="2"
          label="url:"
          label-align-sm="right"
          label-for="url"
        >
          <b-form-input id="url"></b-form-input>
        </b-form-group>

        <b-form-group
          label-cols-sm="2"
          label="Longitude:"
          label-align-sm="right"
          label-for="long"
        >
          <b-form-input id="long"></b-form-input>
        </b-form-group>

        <b-form-group
          label-cols-sm="2"
          label="Latitude:"
          label-align-sm="right"
          label-for="lati"
        >
          <b-form-input id="lati"></b-form-input>
        </b-form-group>

        <b-form-group label-cols-sm="3" label="Ship via:" label-align-sm="right" class="mb-0">
          <b-form-radio-group class="pt-2" :options="['Air', 'Courier', 'Mail']"></b-form-radio-group>
        </b-form-group>
      </b-form-group>
    </b-card>
  </div>
</template>

<script>
export default {
    name:"addPhoto",
    data() {
        return {
            url: "http://localhost:19080/photos"
        }
    },
    methods: {
        ajoutPhoto() {
            axios({
                method: "post",
                url: this.url,
                headers:{

                }

            })
        }
    }
}
</script>