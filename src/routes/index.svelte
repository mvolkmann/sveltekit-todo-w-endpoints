<script context="module">
  import '../global.css'; //TODO: Why doesn't this work?

  export function load({fetch}) {
    return {redirect: '/about', status: 301};
  }
</script>
