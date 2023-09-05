import { Image, ImageSourcePropType } from 'react-native';
import { IconButton, Modal } from 'react-native-paper';
export default function ({
  selectedImage,
  onExit,
}: {
  selectedImage: ImageSourcePropType | undefined;
  onExit: () => void;
}) {
  return (
    <Modal
      visible={!!selectedImage}
      onDismiss={() => onExit()}
      contentContainerStyle={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {selectedImage && <Image style={{ width: '90%', height: '90%' }} source={selectedImage} />}
      <IconButton
        icon="close"
        size={20}
        onPress={() => onExit()}
        style={{ position: 'absolute', top: 0, right: 0 }}
      />
    </Modal>
  );
}
