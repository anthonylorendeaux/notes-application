<script setup lang="ts">
// Keyboard shortcuts list, opened with "?". The shortcuts themselves are
// defined in app.vue (global) and [...slug].vue (note pages).
const open = defineModel<boolean>('open', { default: false })

const groups = [
  {
    title: 'Partout',
    items: [
      { label: 'Rechercher', keys: [['meta', 'k'], ['/']] },
      { label: 'Aller à l\'accueil', keys: [['g', 'h']], chained: true },
      { label: 'Afficher les raccourcis', keys: [['?']] }
    ]
  },
  {
    title: 'Sur une note',
    items: [
      { label: 'Modifier dans Studio', keys: [['e']] },
      { label: 'Note suivante du dossier', keys: [['n']] },
      { label: 'Note précédente du dossier', keys: [['p']] }
    ]
  }
]
</script>

<template>
  <UModal
    v-model:open="open"
    title="Raccourcis clavier"
    description="Inactifs pendant la saisie dans un champ."
  >
    <template #body>
      <div class="flex flex-col gap-6 font-sans">
        <section
          v-for="group in groups"
          :key="group.title"
        >
          <h3 class="mb-2 text-caption font-semibold tracking-wider text-muted uppercase">
            {{ group.title }}
          </h3>

          <ul>
            <li
              v-for="item in group.items"
              :key="item.label"
              class="flex items-center justify-between gap-4 border-b border-line py-2.5 last:border-b-0"
            >
              <span class="text-ink">{{ item.label }}</span>

              <span class="flex items-center gap-1.5 text-small text-dimmed">
                <template
                  v-for="(combo, index) in item.keys"
                  :key="index"
                >
                  <span v-if="index > 0">ou</span>
                  <span class="flex items-center gap-1">
                    <template
                      v-for="(key, keyIndex) in combo"
                      :key="key"
                    >
                      <span v-if="item.chained && keyIndex > 0">puis</span>
                      <UKbd :value="key" />
                    </template>
                  </span>
                </template>
              </span>
            </li>
          </ul>
        </section>
      </div>
    </template>
  </UModal>
</template>
